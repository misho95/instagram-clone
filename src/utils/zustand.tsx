import { create } from "zustand";

export interface followersType {
  id: string;
  userName: string;
}

export interface postCommentsTypeComment {
  id: string;
  user: string;
  comment: string;
}

export interface postCommentsType {
  id: string;
  postId: string;
  comments: postCommentsTypeComment[];
}

export interface postLikeType {
  id: string;
  userId: string;
}

export interface PostsType {
  id: string;
  userId: string;
  link: string;
  type: string;
  date: string;
  likes: postLikeType[];
  commentsRoomId: string;
}

export interface notifType {
  id: string;
  title: string;
  userId: string;
  seen: boolean;
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
  notif: notifType[];
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
