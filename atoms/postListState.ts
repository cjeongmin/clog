import { atom, useRecoilState, useRecoilValue } from "recoil";

export interface PostType {
  id: string;
  title: string;
  body: string;
  date: string;
}

const postListState = atom<PostType[]>({
  key: "PostListState",
  default: [],
});

export default postListState;

export function usePostListState() {
  return useRecoilState(postListState);
}

export function usePostList() {
  return useRecoilValue(postListState);
}
