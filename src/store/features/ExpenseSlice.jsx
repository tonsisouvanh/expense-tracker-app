import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";
import { formatDateString } from "../../utils";
import { notification } from "antd";

// Fetch expenses
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .match({ user_id: userId, is_deleted: false });
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Fetch expense by budget period
export const fetchExpensesByBudgetPeriod = createAsyncThunk(
  "expenses/fetchExpensesByBudgetPeriod",
  async (userId, { rejectWithValue }) => {
    try {
      const currentDate = formatDateString(
        new Date().toLocaleDateString(),
        "MM-DD-YYYY",
        "YYYY-MM-DD",
      );
      const { data: budgetData, error: budgetError } = await supabase
        .from("budgets")
        .select("id,start_date,end_date")
        .lte("start_date", currentDate)
        .gte("end_date", currentDate)
        .limit(1);
      if (budgetError) throw budgetError;
      if (budgetData.length === 0) throw new Error("No active budget found");

      const budgetId = budgetData[0].id;
      const startDate = budgetData[0].start_date;
      const endDate = budgetData[0].end_date;
      const { data, error } = await supabase
        .from("expenses")
        .select(`*,category:categories(*)`)
        .eq("user_id", userId)
        .eq("is_deleted", false)
        .eq("budget_id", budgetId)
        .gte("transaction_date", startDate)
        .lte("transaction_date", endDate);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Add expense
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const formatData = {
      user_id: auth.user.userId,
      category_id: expense.category.id,
      budget_id: expense.budget_id,
      amount: expense.amount,
      transaction_date: formatDateString(
        expense.transaction_date,
        "DD-MM-YYYY",
        "YYYY-MM-DD",
      ),
    };
    try {
      const { error } = await supabase
        .from("expenses")
        .insert({ ...formatData })
        .single();
      if (error) throw error;
      notification.success({ description: "Expense added successfully" });
      return formatData;
    } catch (error) {
      notification.error({ description: error.message || "Something went wrong"});
      return rejectWithValue(error.message);
    }
  },
);

// Update expense
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (expense, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .update(expense)
        .eq("id", expense.id)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  expenses: [],
  totalExpense: 0,
  status: "idle",
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    resetExpenseState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpensesByBudgetPeriod.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpensesByBudgetPeriod.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = [...action.payload];
        state.totalExpense = action.payload.reduce(
          (total, expense) => total + expense.amount,
          0,
        );
      })
      .addCase(fetchExpensesByBudgetPeriod.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add expense
      .addCase(addExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.expenses.push(action.payload);
        state.totalExpense += action.payload.amount;
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update expense
      .addCase(updateExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id,
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete expense
      .addCase(deleteExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload.id,
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetExpenseState } = expenseSlice.actions;

export default expenseSlice.reducer;
