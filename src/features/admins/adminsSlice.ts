import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AdminState {
	name: AdminNameState
	email: string
	password: string
}

type AdminNameState = {
	first: string
	middle: string
	last: string
	extension: string
}

const initialState = {
	email: "",
	password: "",
	name: {
		first: "",
		middle: "",
		last: "",
		extension: ""
	}
} as AdminState

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		setAdmin(state, action: PayloadAction<AdminState>) {
			state.email = action.payload.email
			state.password = action.payload.password
			state.name.first = action.payload.name.first
			state.name.middle = action.payload.name.middle
			state.name.last = action.payload.name.last
			state.name.extension = action.payload.name.extension
		}
	},
});



export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
