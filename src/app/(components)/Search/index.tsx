"use client";

import React, { FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";
import { CmdPost } from "@prisma/client";
import { useRouter } from "next/navigation";
import { redirect, usePathname, useSearchParams } from "next/navigation";

const Search = () => {
  const [cmdPosts, setCmdPosts] = useState<CmdPost[]>([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = Object.fromEntries(formData)["search"].toString();
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    await replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSearch}
      className="relative flex flex-1 flex-shrink-0 mb-6"
    >
      <input
        name="search"
        className="block w-96 rounded-full outline-none py-1 pl-10 text-lg  bg-dark-200 hover:bg-black focus:bg-black"
        placeholder="Search Commands..."
      />
      <SearchIcon className="w-5 h-5 absolute left-3 top-2" />
    </form>
  );
};

export default Search;
