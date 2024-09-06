import React, { FormEvent } from "react";
import CmdInput from "../../../(components)/CmdInput";
import PostForm from "@/app/(components)/PostForm";

const Post = ({ slug }: { slug: string }) => {
  return <PostForm slug={slug} />;
};

export default Post;
