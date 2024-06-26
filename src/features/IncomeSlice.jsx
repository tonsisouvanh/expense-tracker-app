import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../lib/supabase";
import { formatDateString } from "../utils";
import toast from "react-hot-toast";

export const fetchIncomeById = createAsyncThunk(
  "incomes/fetchIncomeById",
  async (id, { rejectWithValue }) => {
    const incomeId = Number(id);
    try {
      const { data, error } = await supabase
        .from("incomes")
        .select(`*,category:categories(*)`)
        .eq("id", incomeId)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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

// Fetch income by budget period
export const fetchIncomesByBudgetPeriod = createAsyncThunk(
  "incomes/fetchIncomesByBudgetPeriod",
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
        .from("incomes")
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
      description: income.description,
      amount: income.amount,
      transaction_date: formatDateString(
        income.transaction_date,
        "DD-MM-YYYY",
        "YYYY-MM-DD",
      ),
      created_at: new Date().toISOString(),
    };
    try {
      const { data, error } = await supabase
        .from("incomes")
        .insert({ ...formatData })
        .single()
        .select(`*,category:categories(*)`);
      if (error) throw error;
      toast.success("Income added successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

// Update income
export const updateIncome = createAsyncThunk(
  "incomes/updateIncome",
  async (income, { rejectWithValue }) => {
    const incomeId = Number(income.incomeId);
    try {
      const formatedData = {
        amount: income.amount,
        category_id: income.category.id,
        transaction_date: formatDateString(
          income.transaction_date,
          "DD-MM-YYYY",
          "YYYY-MM-DD",
        ),
        description: income.description,
        budget_id: income.budget_id,
      };
      const { data, error } = await supabase
        .from("incomes")
        .update({ ...formatedData })
        .eq("id", incomeId)
        .single()
        .select(`*,category:categories(*)`);
      if (error) throw error;
      toast.success("Income updated successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

// Delete income
export const deleteIncome = createAsyncThunk(
  "incomes/deleteIncome",
  async (deletedIncome, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("incomes")
        .delete()
        .eq("id", deletedIncome.incomeId)
        .single();
      if (error) {
        toast.error(error);
        throw error;
      }
      toast.success("Income deleted successfully");
      return { id: deletedIncome.incomeId, amount: deletedIncome.amount };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  incomes: [],
  incomeDetail: null,
  totalIncome: 0,
  status: "idle",
  error: null,
};

const IncomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    resetIncomeStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
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

      // Fetch income by id
      .addCase(fetchIncomeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIncomeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.incomeDetail = { ...action.payload };
      })
      .addCase(fetchIncomeById.rejected, (state, action) => {
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
        const updatedIncome = action.payload;
        const index = state.incomes.findIndex(
          (income) => income.id === updatedIncome.id,
        );
        if (index !== -1) {
          state.incomes[index].amount = updatedIncome.amount;
          state.totalIncome = state.incomes.reduce(
            (total, income) => total + income.amount,
            0,
          );
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
        state.totalIncome -= action.payload.amount;
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetIncomeStatus } = IncomeSlice.actions;
export default IncomeSlice.reducer;
