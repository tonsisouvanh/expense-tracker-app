import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";
import { formatDateString } from "../../utils";
import { notification } from "antd";

// Fetch incomes
export const fetchIncomes = createAsyncThunk(
  "incomes/fetchIncomes",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("incomes")
        .select("*")
        .match({ user_id: userId, is_deleted: false });
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchIncomesByBudgetPeriod = createAsyncThunk(
  "incomes/fetchIncomesByBudgetPeriod",
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
        .from("incomes")
        .select("*")
        .eq("user_id", userId)
        .eq("is_deleted", false)
        .eq("budget_id", budgetId)
        .gte("received_date", startDate)
        .lte("received_date", endDate);
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//TODO: check if state is storing correctly after adding income
// Add income
export const addIncome = createAsyncThunk(
  "incomes/addIncome",
  async (income, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const formatData = {
      user_id: auth.user.userId,
      category_id: income.category.id,
      budget_id: income.budget_id,
      amount: income.amount,
      received_date: formatDateString(
        income.received_date,
        "DD-MM-YYYY",
        "YYYY-MM-DD",
      ),
    };
    try {
      const { error } = await supabase
        .from("incomes")
        .insert({ ...formatData })
        .single();
      if (error) throw error;
      notification.success({ description: "Income added successfully" });
      return formatData;
    } catch (error) {
      notification.error({ description: error.message });
      return rejectWithValue(error.message);
    }
  },
);

// Update income
export const updateIncome = createAsyncThunk(
  "incomes/updateIncome",
  async (income, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("incomes")
        .update(income)
        .eq("id", income.id)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Delete income
export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("incomes")
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
  incomes: [],
  totalIncome: 0,
  status: "idle",
  error: null,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch incomes
      .addCase(fetchIncomesByBudgetPeriod.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIncomesByBudgetPeriod.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomes = [...action.payload];
        state.totalIncome = action.payload.reduce(
          (total, income) => total + income.amount,
          0,
        );
      })
      .addCase(fetchIncomesByBudgetPeriod.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add income
      .addCase(addIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomes.push(action.payload);
        state.totalIncome += action.payload.amount;
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update income
      .addCase(updateIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.incomes.findIndex(
          (income) => income.id === action.payload.id,
        );
        if (index !== -1) {
          state.incomes[index] = action.payload;
        }
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete income
      .addCase(deleteIncome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomes = state.incomes.filter(
          (income) => income.id !== action.payload.id,
        );
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default incomeSlice.reducer;
