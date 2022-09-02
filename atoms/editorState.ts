import { convertToRaw, EditorState } from "draft-js";
import { atom, selector, useRecoilState } from "recoil";

const editorState = atom<EditorState>({
  key: "EditorState",
  default: EditorState.createEmpty(),
});

export function useEditorState() {
  return useRecoilState(editorState);
}

export const editorContentSelector = selector({
  key: "EditorContentSelector",
  get: ({ get }) => {
    const state = get(editorState);
    return convertToRaw(state.getCurrentContent()).blocks;
  },
});

export default editorState;
