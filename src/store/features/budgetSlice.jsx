import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../lib/supabase";
import { notification } from "antd";
import { formatDateString } from "../../utils";

export const fetchActiveBudget = createAsyncThunk(
  "budgets/fetchActiveBudget",
  async () => {
    const currentDate = new Date().toLocaleDateString();
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .gt("end_date", currentDate)
      .limit(1);
    if (error) throw new Error(error.message);
    return data[0];
  },
);

// Async thunk to fetch budgets
export const fetchBudgets = createAsyncThunk(
  "budgets/fetchBudgets",
  async (userId) => {
    const { data, error } = await supabase
      .from("budgets")
      .select("*")
      .eq("user_id", userId)
      .eq("is_deleted", false);

    if (error) throw new Error(error.message);
    return data;
  },
);

// Async thunk to create a new budget
export const createBudget = createAsyncThunk(
  "budgets/createBudget",
  async ({ userId, amount, startDate, endDate }) => {
    try {
      const { data, error } = await supabase
        .from("budgets")
        .insert({
          amount,
          start_date: startDate,
          end_date: endDate,
          user_id: userId,
        })
        .select();

      if (error) {
        throw new Error(error.message);
      }
      notification.success({ description: "Budget created successfully" });
      return data[0];
    } catch (error) {
      notification.error({ description: "Failed to create budget" });
      throw new Error(error.message);
    }
  },
);

// Async thunk to update an existing budget
export const updateBudget = createAsyncThunk(
  "budgets/updateBudget",
  async (updatedBudget) => {
    try {
      const budgetId = updatedBudget.budgetId;
      const formatedData = {
        amount: updatedBudget.budget.toString(),
        start_date: formatDateString(
          updatedBudget.startDate,
          "YYYY-MM-DD",
          "MM-DD-YYYY",
        ),
        end_date: formatDateString(
          updatedBudget.endDate,
          "YYYY-MM-DD",
          "MM-DD-YYYY",
        ),
      };
      const { error } = await supabase
        .from("budgets")
        .update({ ...formatedData })
        .eq("id", budgetId);
      if (error) {
        throw new Error(error.message);
      }
      notification.success({ description: "Budget updated successfully" });
    } catch (error) {
      notification.error({ description: "Failed to update budget" });
      console.log(error);
    }
  },
);

// Async thunk to delete a budget
export const deleteBudget = createAsyncThunk(
  "budgets/deleteBudget",
  async (budgetId) => {
    const { error } = await supabase
      .from("budgets")
      .update({ is_deleted: true })
      .eq("id", budgetId);

    if (error) throw new Error(error.message);
    return budgetId;
  },
);

const initialState = {
  budgets: [],
  activeBudget: null,
  status: "idle",
  error: null,
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudgets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBudgets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets = action.payload;
      })
      .addCase(fetchBudgets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchActiveBudget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchActiveBudget.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activeBudget = { ...action.payload };
      })
      .addCase(fetchActiveBudget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBudget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets.push(action.payload);
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateBudget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBudget.fulfilled, (state) => {
        state.status = "succeeded";
        // const index = state.budgets.findIndex(
        //   (budget) => budget.id === action.payload.id,
        // );
        // if (index !== -1) {
        //   state.budgets[index] = action.payload;
        // }
        // state.budgetDetail = { ...action.payload };
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBudget.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.budgets = state.budgets.filter(
          (budget) => budget.id !== action.payload,
        );
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatus } = budgetSlice.actions;

export default budgetSlice.reducer;
