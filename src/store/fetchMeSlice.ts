import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { parseCookies } from "nookies";

interface User {
	// Определите тип данных для пользователя
}

interface FetchState {
	data: User;
	status: "idle" | "loading" | "resolved" | "rejected";
	error: any;
}

const initialState: FetchState = {
	data: {},
	status: "idle",
	error: null,
};

const API_LINK = process.env.NEXT_PUBLIC_API_LINK;

export const fetchMe = createAsyncThunk<User[], void, { rejectValue: any }>(
	"fetch/me",
	async (_, { rejectWithValue }) => {
		try {
			const cookie = parseCookies();

			const response = await axios.get<User[]>(`${API_LINK}/api/users/me`, {
				headers: { Authorization: `Bearer ${cookie.jwt}` },
			});
			return response.data;
		} catch (error: any) {
			console.log(error);
			return rejectWithValue(error.message);
		}
	}
);

const fetchMeSlice = createSlice({
	name: "fetch",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMe.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				state.status = "resolved";
				state.data = action.payload;
			})
			.addCase(fetchMe.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload;
			});
	},
});

export default fetchMeSlice.reducer;
