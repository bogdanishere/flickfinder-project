"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length === 1) {
      router.push("/1");
    }
    router.back();
  };

  return (
    <Button onClick={handleClick} className="lg:w-[50%] mx-auto w-full">
      Back to main page
    </Button>
  );
}
