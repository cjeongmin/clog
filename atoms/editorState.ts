import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const editorState = atom<EditorState>({
  key: "EditorState",
  default: EditorState.createEmpty(),
});

export function useEditorState() {
  return useRecoilState(editorState);
}

const editorContentSelector = selector({
  key: "EditorContentSelector",
  get: ({ get }) => {
    const state = get(editorState);
    return convertToHTML(state.getCurrentContent());
  },
});

export function getContent() {
  return useRecoilValue(editorContentSelector);
}

export default editorState;
