import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export interface PostType {
  id: number;
  title: string;
  body: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
}

const postListState = atom<PostType[]>({
  key: "PostListState",
  default: [],
});

const nextIdSelector = selector({
  key: "NextIdSelector",
  get: ({ get }) => {
    const list = get(postListState);
    const res = list.reduce<number>((max, curr) => {
      if (max < curr.id) {
        return curr.id;
      }
      return max;
    }, 0);
    return res + 1;
  },
});

export function getNextId() {
  return useRecoilValue(nextIdSelector);
}

export function usePostListState() {
  return useRecoilState(postListState);
}

export function usePostList() {
  return useRecoilValue(postListState);
}

export default postListState;
