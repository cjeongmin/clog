import PostModel from "@/models/PostModel";
import { atom } from "recoil";

export const postsState = atom<PostModel[]>({
  key: "postsState",
  default: [],
});
