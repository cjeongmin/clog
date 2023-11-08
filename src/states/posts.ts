import MarkDownFile from "@/models/MarkDownFile";
import { atom } from "recoil";

export const postsState = atom<MarkDownFile[]>({
  key: "postsState",
  default: [],
});
