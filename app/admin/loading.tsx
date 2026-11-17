import styles from "./admin.module.css";

// Suspense boundary for every admin route (they read the session cookie and
// the database at request time).
export default function AdminLoading() {
  return <div className={styles.root} aria-busy="true" />;
}
