"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createJob, updateJob, type JobFormState } from "../../_actions/jobs";
import { EMPLOYMENT_TYPES, JOB_LIMITS, type Job } from "@/lib/jobs-shared";
import styles from "../../admin.module.css";
import { useLoadingToast } from "../LoadingToast";

type Initial = Omit<Job, "id" | "created_at" | "updated_at">;

export const EMPTY_JOB: Initial = {
  title: "",
  department: "",
  location: "Pune",
  employment_type: "Full-time",
  experience: "",
  salary: "",
  summary: "",
  description: "",
  requirements: "",
  status: "open",
};

export default function JobForm({ id, initial }: { id?: string; initial: Initial }) {
  const action = id ? updateJob.bind(null, id) : createJob;
  const [state, formAction, pending] = useActionState<JobFormState, FormData>(action, undefined);
  useLoadingToast(pending, "Saving job…");

  return (
    <form action={formAction}>
      {state?.error && <p className={styles.error}>{state.error}</p>}

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Job details</h2>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">Job title</label>
          <input id="title" name="title" required maxLength={JOB_LIMITS.title} defaultValue={initial.title} className={styles.input} placeholder="e.g. Senior Software Engineer" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="department">Department</label>
            <input id="department" name="department" maxLength={JOB_LIMITS.department} defaultValue={initial.department} className={styles.input} placeholder="e.g. Engineering" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="location">Location</label>
            <input id="location" name="location" maxLength={JOB_LIMITS.location} defaultValue={initial.location} className={styles.input} placeholder="e.g. Pune / Delhi / Bengaluru" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="employment_type">Job type</label>
            <select id="employment_type" name="employment_type" defaultValue={initial.employment_type} className={styles.select}>
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="experience">Experience <span className={styles.hint}>optional</span></label>
            <input id="experience" name="experience" maxLength={JOB_LIMITS.experience} defaultValue={initial.experience} className={styles.input} placeholder="e.g. 3-5 years" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="salary">Salary <span className={styles.hint}>optional</span></label>
            <input id="salary" name="salary" maxLength={JOB_LIMITS.salary} defaultValue={initial.salary} className={styles.input} placeholder="e.g. 6-10 LPA" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={initial.status} className={styles.select}>
              <option value="open">Open (visible on /careers)</option>
              <option value="closed">Closed (hidden)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Description</h2>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="summary">Short summary <span className={styles.hint}>shown on the job card</span></label>
          <textarea id="summary" name="summary" rows={2} maxLength={JOB_LIMITS.summary} defaultValue={initial.summary} className={styles.textarea} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">Job description <span className={styles.hint}>one line per paragraph</span></label>
          <textarea id="description" name="description" rows={8} maxLength={JOB_LIMITS.description} defaultValue={initial.description} className={styles.textarea} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="requirements">Requirements <span className={styles.hint}>one per line, shown as a bullet list</span></label>
          <textarea id="requirements" name="requirements" rows={6} maxLength={JOB_LIMITS.requirements} defaultValue={initial.requirements} className={styles.textarea} />
        </div>
      </div>

      <div className={styles.row} style={{ marginTop: 16 }}>
        <button type="submit" className={styles.buttonPrimary} disabled={pending}>
          {pending ? "Saving…" : id ? "Save changes" : "Publish job"}
        </button>
        <Link href="/admin/jobs/" className={styles.button}>Cancel</Link>
      </div>
    </form>
  );
}
