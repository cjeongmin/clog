import MarkDownFile from "@/models/MarkDownFile";
import { atom, useRecoilState } from "recoil";

interface Posts {
  date: MarkDownFile[];
  noDate: MarkDownFile[];
}

const postsState = atom<Posts>({
  key: "postsState",
  default: {
    date: [],
    noDate: [],
  },
});

export const usePostsState = () => {
  const [posts, setter] = useRecoilState(postsState);

  const setPosts = (valOrUpdater: Posts | ((currVal: Posts) => Posts)) => {
    const alt: Posts =
      typeof valOrUpdater === "function" ? valOrUpdater(posts) : valOrUpdater;

    setter({
      date: alt.date.toSorted((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        return -1;
      }),
      noDate: alt.noDate.toSorted((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        return 1;
      }),
    });
  };

  return { posts, setPosts };
};
