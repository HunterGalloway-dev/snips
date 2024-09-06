"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const PostForm = ({ slug }: { slug: string }) => {
  const editMode = slug.length > 0;
  const router = useRouter();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await fetch("/api/cmds", {
      method: "POST",
      body: formData,
    });

    if (result.status == 201) {
      router.push("/snips");
      router.refresh();
    }
  }

  return (
    <div className="flex justify-center items-center">
      {slug}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-accent">Command Name</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control mb-3 w-96">
          <div className="label">
            <span className="label-text">Your bio</span>
          </div>
          <textarea
            name="command"
            className="textarea textarea-bordered h-24"
            placeholder="Command..."
          ></textarea>
        </label>

        <button className="btn btn-outline btn-accent">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
