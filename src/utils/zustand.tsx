import { create } from "zustand";

interface followersType {
  id: string;
  userName: string;
}

interface PostsType {
  id: string;
  userId: string;
  img: string;
}

export interface userType {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  pass: string;
  avatar: string;
  following: followersType[];
  followers: followersType[];
  posts: PostsType[];
}

interface userSignInType {
  user: null | userType;
  setUser: (userData: userType | null) => void;
}

export const userSignIn = create<userSignInType>((set) => ({
  user: null,
  setUser: (userData) => set(() => ({ user: userData })),
}));

interface activeNavType {
  active: null | string;
  setActive: (value: string | null) => void;
}

export const activeNav = create<activeNavType>((set) => ({
  active: null,
  setActive: (value: string | null) => set(() => ({ active: value })),
}));
