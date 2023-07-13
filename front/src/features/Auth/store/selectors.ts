import { RootState } from "@/app/store";

export const selectLogin = (state: RootState) => state.auth.login;
export const selectRegistration = (state: RootState) => state.auth.registration;

export const selectUserRole = (state: RootState) => state.auth.getProfile.user.type;
export const selectUserProfile = (state: RootState) => state.auth.getProfile;