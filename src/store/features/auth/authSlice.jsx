// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../../lib/supabase";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return user;
  },
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    localStorage.setItem(
      "auth_info",
      JSON.stringify({ userId: data.user.id, email: data.user.email }),
    );
    return { email: data.user.email, userId: data.user.id };
  },
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const { error } = await supabase.auth.signOut({ scope: "local" });
  if (error) throw new Error(error.message);
  localStorage.removeItem("auth_info");
  return null;
});

const initialState = {
  user: localStorage.getItem("auth_info")
    ? JSON.parse(localStorage.getItem("auth_info") || "")
    : null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser, resetStatus } = authSlice.actions;

export const initializeAuthListener = () => (dispatch) => {
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (session) {
        dispatch(
          setUser({ userId: session.user.id, email: session.user.email }),
        );
        localStorage.setItem(
          "auth_info",
          JSON.stringify({
            userId: session.user.id,
            email: session.user.email,
          }),
        );
      } else {
        dispatch(setUser(null));
        localStorage.removeItem("auth_info");
      }
    },
  );
  return () => {
    listener?.subscription.unsubscribe();
  };
};

export default authSlice.reducer;
