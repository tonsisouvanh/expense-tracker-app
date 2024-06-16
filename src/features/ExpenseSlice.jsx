import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";
import { formatDateString } from "../utils";
import toast from "react-hot-toast";

// Fetch exepense by id
export const fetchExpenseById = createAsyncThunk(
  "expenses/fetchExpenseById",
  async (id, { rejectWithValue }) => {
    const expenseId = Number(id);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select(`*,category:categories(*)`)
        .eq("id", expenseId)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
  async (_, { rejectWithValue }) => {
    const { user } = (await supabase.auth.getSession()).data.session;
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
        .eq("user_id", user.id)
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
      description: expense.description,
      transaction_date: formatDateString(
        expense.transaction_date,
        "DD-MM-YYYY",
        "YYYY-MM-DD",
      ),
    };
    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert({ ...formatData })
        .single()
        .select(`*,category:categories(*)`);
      if (error) throw error;
      toast.success("Expense added successfully");
      return data;
    } catch (error) {
      toast.error(`${error.message || "Something went wrong"}`);
      return rejectWithValue(error.message);
    }
  },
);

// Update expense
export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async (expense, { rejectWithValue }) => {
    const expenseId = Number(expense.expenseId);
    try {
      const formatedData = {
        amount: expense.amount,
        category_id: expense.category.id,
        transaction_date: formatDateString(
          expense.transaction_date,
          "DD-MM-YYYY",
          "YYYY-MM-DD",
        ),
        description: expense.description,
        budget_id: expense.budget_id,
      };
      const { data, error } = await supabase
        .from("expenses")
        .update({ ...formatedData })
        .eq("id", expenseId)
        .single()
        .select(`*,category:categories(*)`);
      if (error) throw error;
      toast.success("Expense updated successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

// Delete expense
export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (deletedExpense, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", deletedExpense.expenseId)
        .single();
      if (error) {
        toast.error(error);
        throw error;
      }
      toast.success("Expense deleted successfully");
      return { id: deletedExpense.expenseId, amount: deletedExpense.amount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const initialState = {
  expenses: [],
  expenseDetail: null,
  totalExpense: 0,
  status: "idle",
  error: null,
};

const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    resetExpenseStatus: (state) => {
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

      // Fetch expense by id
      .addCase(fetchExpenseById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseDetail = { ...action.payload };
      })
      .addCase(fetchExpenseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add expense
      .addCase(addExpense.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses.push(action.payload);
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
        const updatedExpense = action.payload;
        const index = state.expenses.findIndex(
          (expense) => expense.id === updatedExpense.id,
        );
        if (index !== -1) {
          state.expenses[index].amount = updatedExpense.amount;
          state.totalExpense = state.expenses.reduce(
            (total, expense) => total + expense.amount,
            0,
          );
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
        state.totalExpense -= action.payload.amount;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetExpenseStatus } = ExpenseSlice.actions;

export default ExpenseSlice.reducer;
