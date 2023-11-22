import MarkDownFile, { DateValue } from "@/models/MarkDownFile";
import { atom, selectorFamily, useRecoilState } from "recoil";

interface Tags {
  [key: string]: MarkDownFile[];
}

const tagsState = atom<Tags>({
  key: "tagsState",
  default: {},
});

export const useTagsState = () => {
  const [tags, setter] = useRecoilState(tagsState);

  const setTags = (valOrUpdater: Tags | ((currVal: Tags) => Tags)) => {
    const alt: Tags =
      typeof valOrUpdater === "function" ? valOrUpdater(tags) : valOrUpdater;

    const sorted: Tags = {};

    for (const key in alt) {
      const files = alt[key];
      sorted[key] = files.toSorted((a, b) => {
        if (a.date != DateValue.NoDate && b.date != DateValue.NoDate) {
          if (a.date < b.date) {
            return 1;
          }
          return -1;
        }

        if (a.date != DateValue.NoDate) {
          return -1;
        }
        if (b.date != DateValue.NoDate) {
          return 1;
        }

        if (a.name < b.name) {
          return -1;
        }
        return 1;
      });
    }

    setter(sorted);
  };

  return { tags, setTags };
};
