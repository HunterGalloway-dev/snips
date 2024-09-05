"use client";

import { Bell, Copy } from "lucide-react";
import React from "react";

interface CmdProps {
  placeholder: string;
  value: string;
  isDisabled: boolean;
  name: string;
}

const CmdInput = ({ placeholder, value, isDisabled, name }: CmdProps) => {
  const copy = async () => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(value);
    } else {
      document.execCommand("copy", true, value);
    }
  };
  return (
    <div className="flex justify-between items-center bg-black p-4 rounded-md w-full mb-5">
      <span className="text-cgreen-400">$</span>
      <div className="relative w-full">
        <input
          type="text"
          name={name}
          defaultValue={value}
          className="outline-none text-cgreen-400 bg-black ml-2 w-full"
          placeholder={placeholder}
          disabled={isDisabled}
        />
        <div className="cursor-pointer absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-non ">
          <button onClick={copy}>
            <Copy className="text-gray-500 hover:text-cgreen-400" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CmdInput;
