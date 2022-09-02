import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export interface PostType {
  id: number;
  title: string;
  body: string;
  date: string;
}

const postListState = atom<PostType[]>({
  key: "PostListState",
  default: [],
});

export const nextIdSelector = selector({
  key: "NextIdSelector",
  get: ({ get }) => {
    const list = get(postListState);
    const length = list.length;
    return length ? list[length - 1].id + 1 : 1;
  },
});

export function usePostListState() {
  return useRecoilState(postListState);
}

export function usePostList() {
  return useRecoilValue(postListState);
}

export default postListState;
