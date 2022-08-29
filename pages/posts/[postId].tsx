import type { NextPage } from "next";
import { useRouter } from "next/router";

const Post: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;
  return <p>{`${postId}`}</p>;
};

export default Post;
