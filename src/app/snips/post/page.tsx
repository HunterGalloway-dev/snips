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
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <CmdInput
          value=""
          name="name"
          placeholder="Command Name"
          isDisabled={false}
        />
        <CmdInput
          value=""
          name="command"
          placeholder="Enter command here..."
          isDisabled={false}
        />
        <button
          type="submit"
          className="bg-black p-3 rounded-lg outline-2 outline-cgreen-400 font-extrabold"
        >
          Add Command
        </button>
      </form>
    </div>
  );
};

export default Post;
