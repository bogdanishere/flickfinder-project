"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

import styles from "@/styles/pages/pagination.module.scss";
import { useTheme } from "@/_hooks/useTheme";

export function Pagination({ page }: { page: number }) {
  const router = useRouter();

  const { theme } = useTheme();

  function handlePrevious() {
    if (page <= 1) return;
    router.replace(`/?page=${page - 1}`);
  }

  function handleNext() {
    router.replace(`/?page=${page + 1}`);
  }
  return (
    <div className={styles.pagination}>
      <Button onClick={handlePrevious}>Previous</Button>
      <button
        className={`${styles.nonButton} ${styles[`nonButton__${theme}`]}`}
      >
        {page}
      </button>
      <Button onClick={handleNext}>Next</Button>
    </div>
  );
}
