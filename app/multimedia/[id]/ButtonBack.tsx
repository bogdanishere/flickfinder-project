"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button onClick={handleClick} className="lg:w-[50%] mx-auto w-full">
      Back to main page
    </Button>
  );
}
