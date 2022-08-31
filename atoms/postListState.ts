import { atom, useRecoilState, useRecoilValue } from "recoil";

export interface PostType {
  title: string;
  body: string;
  date: Date;
}

const postListState = atom<PostType[]>({
  key: "postList",
  default: [],
});

export default postListState;

export function usePostListState() {
  return useRecoilState(postListState);
}

export function usePostList() {
  return useRecoilValue(postListState);
}
