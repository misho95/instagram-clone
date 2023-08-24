import { create } from "zustand";

export const userSignIn = create((set) => ({
  user: null,
  setUser: (userData) => set(() => ({ user: userData })),
}));
