"use client";

import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import ConditionalRender from "../ConditionaRender";
import { CmdPost } from "@prisma/client";

const PostForm = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const editMode = slug.length > 0;

  const [cmdPost, setCmdPost] = useState<CmdPost>();

  useEffect(() => {
    if (editMode) {
      fetch(`/api/cmds/${slug}`, { method: "get" })
        .then((res) => res.json())
        .then((data) => setCmdPost(data.cmdPost));
    }
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("id", slug);

    const result = await fetch("/api/cmds", {
      method: "POST",
      body: formData,
    });

    if (result.status == 201) {
      router.push("/snips");
      router.refresh();
    }
  }

  const onDelete = async () => {
    const result = await fetch(`/api/cmds/${slug}`, {
      method: "DELETE",
    });

    if (result.status == 200) {
      router.push("/snips");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-accent">Command Name</span>
          </div>
          <input
            required={true}
            type="text"
            defaultValue={cmdPost?.name}
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
            required={true}
            defaultValue={cmdPost?.command}
            className="textarea textarea-bordered h-24"
            placeholder="Command..."
          ></textarea>
        </label>

        <div className="flex space-x-4">
          <button className="btn btn-outline btn-accent">
            {editMode ? "Save" : "Post"}
          </button>
        </div>
      </form>
      <ConditionalRender show={editMode}>
        <button className="btn btn-outline btn-warning" onClick={onDelete}>
          Delete
        </button>
      </ConditionalRender>
    </div>
  );
};

export default PostForm;
