import { Tag } from "@/models/Tag";
import { atom, selectorFamily } from "recoil";

export const tagsState = atom<{ [key: string]: Tag }>({
  key: "tagsState",
  default: {},
});

export const tagSelector = selectorFamily({
  key: "tagSelector",
  get(name: string) {
    return ({ get }) => {
      const tags = get(tagsState);
      const tag = tags[name];
      return tag;
    };
  },
});
