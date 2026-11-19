import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { getJob } from "@/lib/jobs";
import { isUuid } from "../../../_actions/validation";
import JobForm from "../JobForm";
import styles from "../../../admin.module.css";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;
  if (!isUuid(id)) notFound();
  const job = await getJob(id);
  if (!job) notFound();

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Edit job</h1>
        <Link href="/admin/jobs/" className={styles.button}>Back to jobs</Link>
      </div>
      <JobForm id={job.id} initial={job} />
    </>
  );
}
