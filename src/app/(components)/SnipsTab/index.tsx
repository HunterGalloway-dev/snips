"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { MouseEventHandler, useEffect, useState } from "react";

type Props = {};

const SnipsTab = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState("mysnips");
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  useEffect(() => {
    const curParams = new URLSearchParams(searchParams);
    if (!curParams.get("tab")) {
      curParams.set("tab", selectedTab);

      replace(`${pathname}?${curParams.toString()}`);
    } else {
      setSelectedTab(curParams.get("tab")!);
    }
  }, []);

  function tabClick(key: string): void {
    setSelectedTab(key);
    const params = new URLSearchParams(searchParams);

    params.set("tab", key);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="tabs-lg tabs-boxed">
      <button
        className={`tab ${selectedTab == "mysnips" ? "tab-active" : ""}`}
        onClick={() => tabClick("mysnips")}
      >
        My Snips
      </button>
      <button
        className={`tab ${selectedTab == "mylikes" ? "tab-active" : ""}`}
        onClick={() => tabClick("mylikes")}
      >
        Liked Snips
      </button>
    </div>
  );
};

export default SnipsTab;
