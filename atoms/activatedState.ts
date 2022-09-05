import { atom, DefaultValue, selector, useRecoilState } from "recoil";

interface activated {
  modal: boolean;
}

const activatedState = atom<activated>({
  key: "Activated",
  default: {
    modal: false,
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

export default activatedState;
