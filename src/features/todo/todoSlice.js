import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	todos: [],
	error: "",
};

export const fetchTodos = createAsyncThunk("todo/fetchTodos", (id) => {
	return axios
		.get(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
		.then((response) => response.data);
});

const todoSlice = createSlice({
	name: "todo",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.loading = false;
			state.todos = action.payload;
			state.error = "";
		});

		builder.addCase(fetchTodos.rejected, (state, action) => {
			state.loading = false;
			state.todos = [];
			state.error = action.error.message;
		});
	},
});

export default todoSlice.reducer;
