import { atom } from "recoil";

export interface PostType {
  key: number;
  date: Date;
  content: string;
}

const postListState = atom<PostType[]>({
  key: "postListState",
  default: [],
});

export default postListState;
