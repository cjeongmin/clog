import { User } from "firebase/auth";
import { atom, useRecoilState, useRecoilValue } from "recoil";

const adminState = atom<User | null>({
  key: "AdminState",
  default: null,
});

export function useAdminState() {
  return useRecoilState(adminState);
}

export function useAdmin() {
  return useRecoilValue(adminState);
}

export default useAdminState;
