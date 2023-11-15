import MarkDownFile from "@/models/MarkDownFile";
import { atom, selector } from "recoil";

export const postsState = atom<MarkDownFile[]>({
  key: "postsState",
  default: [],
});

export const postsWithDateSelector = selector<MarkDownFile[]>({
  key: "postsWithDate",
  get({ get }) {
    const posts = get(postsState);
    return posts
      .filter((post) => post.date !== "...")
      .sort((post1, post2) => {
        if (post1.date > post2.date) return -1;
        return 1;
      });
  },
});

export const postsWithoutDateSelector = selector<MarkDownFile[]>({
  key: "postsWithoutDate",
  get({ get }) {
    const posts = get(postsState);
    return posts
      .filter((post) => post.date === "...")
      .sort((post1, post2) => {
        if (post1.name > post2.date) return -1;
        return 1;
      });
  },
});
