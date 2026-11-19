import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import JobForm, { EMPTY_JOB } from "../JobForm";
import styles from "../../../admin.module.css";

export default async function NewJobPage() {
  await requireStaff();
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Add job</h1>
        <Link href="/admin/jobs/" className={styles.button}>Back to jobs</Link>
      </div>
      <JobForm initial={EMPTY_JOB} />
    </>
  );
}
