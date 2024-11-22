"use client";

import Home from "@/_components/Home";
import verifyPage from "@/utils/verifyPage";
import { useSearchParams } from "next/navigation";

function Page() {
  const page = useSearchParams().get("page");

  const pageVerified = verifyPage(page);

  return <Home page={pageVerified} />;
}

export default Page;
