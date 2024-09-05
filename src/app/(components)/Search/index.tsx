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
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          name="search"
          className="grow"
          placeholder="Search Snips"
        />
        <SearchIcon className="w-4 h-4" />
      </label>
    </form>
  );
};

export default Search;
