import React, { FormEvent } from "react";
import CmdInput from "../../../(components)/CmdInput";
import PostForm from "@/app/(components)/PostForm";

const Post = ({ params }: { params: { slug: string } }) => {
  return <PostForm slug={params.slug}></PostForm>;
};

export default Post;
