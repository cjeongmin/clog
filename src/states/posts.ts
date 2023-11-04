import PostModel from "@/models/PostModel";
import { atom, selector } from "recoil";

export const postsState = atom<PostModel[]>({
  key: "postsState",
  default: [],
});

export const postsSelector = selector({
  key: "posts",
  get: ({ get }) => {
    const posts = get(postsState);
    return posts;
  },
});
