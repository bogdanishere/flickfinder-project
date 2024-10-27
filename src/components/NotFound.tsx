import Link from "next/link";
import styles from "../styles/pages/notFound.module.scss";

function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>This page could not be found :(</h1>
      <Link href="/" className={styles.link}>
        <button>Go back</button>
      </Link>
    </main>
  );
}

export default NotFound;
