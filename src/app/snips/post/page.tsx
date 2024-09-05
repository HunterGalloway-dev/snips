"use client";

import React, { FormEvent } from "react";
import CmdInput from "../../(components)/CmdInput";

const Post = () => {
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    fetch("/api/cmds", {
      method: "POST",
      body: formData,
    });
  }

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

export default Post;
