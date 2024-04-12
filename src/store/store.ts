import { configureStore } from "@reduxjs/toolkit";
import fetchMeSlice from "./fetchMeSlice";

export default configureStore({
	reducer: {
		todos: fetchMeSlice,
	},
});
