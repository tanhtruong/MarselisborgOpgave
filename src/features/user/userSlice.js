import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { get } from "lodash";

const initialState = {
	loading: false,
	users: [],
	error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
	return axios
		.get("https://jsonplaceholder.typicode.com/users")
		.then((response) => response.data);
});

export function sortByName(users) {
	return users.sort();
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		sortByName(state) {
			state.users = state.users.sort();
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUsers.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload;
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
