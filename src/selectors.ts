import { RootState } from './store'; // assuming you have defined the RootState type

export const selectAdmin = (state: RootState) => state.admin;