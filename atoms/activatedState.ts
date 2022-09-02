import { atom, DefaultValue, selector, useRecoilState } from "recoil";

interface activated {
  modal: boolean;
  editor: boolean;
}

const activatedState = atom<activated>({
  key: "Activated",
  default: {
    modal: false,
    editor: false,
  },
});

const activatedModalState = selector({
  key: "ActivatedModalState",
  get: ({ get }) => {
    return get(activatedState).modal;
  },
  set: ({ set }, newValue) => {
    set(activatedState, (prev) => {
      if (newValue instanceof DefaultValue) return newValue;
      return { ...prev, modal: newValue };
    });
  },
});

export function useActivatedModalState() {
  return useRecoilState(activatedModalState);
}

const activatedEditorState = selector({
  key: "ActivatedEditorState",
  get: ({ get }) => {
    return get(activatedState).editor;
  },
  set: ({ set }, newValue) => {
    set(activatedState, (prev) => {
      if (newValue instanceof DefaultValue) return newValue;
      return { ...prev, editor: newValue };
    });
  },
});

export function useActivatedEditorState() {
  return useRecoilState(activatedEditorState);
}

export default activatedState;
