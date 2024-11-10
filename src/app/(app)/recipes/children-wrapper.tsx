"use client";

import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function ChildrenWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const key = {
    page: searchParams.get("page"),
    q: searchParams.get("q"),
  };
  return <Fragment key={JSON.stringify(key)}>{children}</Fragment>;
}
