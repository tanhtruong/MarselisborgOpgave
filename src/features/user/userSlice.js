import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const initialState = {
	loading: false,
	users: [],
	numOfUsers: 0,
	order: "asc",
	error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
	return axios
		.get("https://jsonplaceholder.typicode.com/users")
		.then((response) => response.data);
});

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		sortBy: (state, action) => {
			state.order = state.order !== "asc" ? "asc" : "desc";
			state.users = _.orderBy(state.users, action.payload.value, state.order);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
			state.numOfUsers = action.payload.length;
			state.error = "";
		});

		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			state.error = action.error.message;
		});
	},
});

export default userSlice.reducer;
export const { sortBy } = userSlice.actions;
