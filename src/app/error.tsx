"use client";
import { useRouter } from "next/navigation";

import styles from "@/styles/pages/error.module.scss";

function Error() {
  const router = useRouter();
  return (
    <div className={styles["error-container"]}>
      <h1>Movie not found</h1>
      <p>
        Sorry, there are some problem with The Open Movie Database or most
        probably the movie you are looking for is not available at the moment.
        Please try again later.
      </p>
      <button
        className={`${styles.btn} ${styles["btn--green"]} ${styles["btn--animated"]}`}
        onClick={() => router.back()}
      >
        Go back
      </button>
    </div>
  );
}

export default Error;
