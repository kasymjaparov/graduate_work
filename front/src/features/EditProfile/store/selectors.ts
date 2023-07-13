import { RootState } from "@/app/store";

export const selectEditProfile = (state: RootState) => state.editProfile.status;
