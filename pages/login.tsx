import { useRouter } from "next/router";
import { useState } from "react";
import useUserState from "../atoms/adminState";
import { login } from "../utils/firebase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useUserState();

  const onLogin = async () => {
    const user = await login({ email, password });
    if (user) {
      setAdmin(user);
      alert("로그인 성공");
      router.push("/");
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onLogin}>Login</button>
    </>
  );
};

export default Login;
