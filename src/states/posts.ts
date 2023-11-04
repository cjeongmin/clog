import { fetchPosts, getFileContent } from "@/libs/post";
import PostModel from "@/models/PostModel";
import { selector } from "recoil";

export const postsSelector = selector({
  key: "posts",
  get: async ({ get }) => {
    const postFiles = await fetchPosts();

    const res: PostModel[] = [];
    for (const file of postFiles) {
      const content: string = await getFileContent(file.path);
      for (let i = 0; i < 2; i++)
        res.push(new PostModel(file.name, content, new Date()));
    }

    return res;
  },
});
