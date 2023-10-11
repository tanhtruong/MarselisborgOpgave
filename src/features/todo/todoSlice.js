import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	loading: false,
	todos: [],
	numOfCompletedTodos: 0,
	numOfUncompletedTodos: 0,
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
	reducers: {
		toggleCompleteness: (state, action) => {
			state.todos = state.todos.map((todo) =>
				todo.id === action.payload["id"] ? { ...todo, completed: !todo.completed } : todo
			);
			state.numOfCompletedTodos = state.todos.filter((todo) => todo.completed).length;
			state.numOfUncompletedTodos = state.todos.filter((todo) => !todo.completed).length;

			console.log("Clicked", action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTodos.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			state.loading = false;
			state.todos = action.payload;
			state.numOfCompletedTodos = state.todos.filter((todo) => todo.completed).length;
			state.numOfUncompletedTodos = state.todos.filter((todo) => !todo.completed).length;
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
export const { toggleCompleteness } = todoSlice.actions;
