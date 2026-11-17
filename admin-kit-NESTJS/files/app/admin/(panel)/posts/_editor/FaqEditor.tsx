"use client";

import type { Faq } from "@/lib/posts";
import styles from "../../../admin.module.css";

type Props = {
  faqs: Faq[];
  onChange: (faqs: Faq[]) => void;
};

// Question/answer pairs shown after the post body on the live page, and
// emitted as FAQPage structured data for Google.
export default function FaqEditor({ faqs, onChange }: Props) {
  const update = (index: number, field: keyof Faq, value: string) =>
    onChange(faqs.map((f, i) => (i === index ? { ...f, [field]: value } : f)));

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= faqs.length) return;
    const next = [...faqs];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index: number) => {
    const faq = faqs[index];
    if ((faq.question || faq.answer) && !window.confirm("Remove this FAQ?")) return;
    onChange(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.card} style={{ marginBottom: 16 }}>
      <div className={styles.row} style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h2>
          FAQs <span className={`${styles.muted} ${styles.small}`} style={{ fontWeight: 400 }}>({faqs.length})</span>
        </h2>
        <span className={styles.hint}>Shown after the blog content, with FAQ schema for Google</span>
      </div>

      {faqs.length === 0 && (
        <p className={styles.muted} style={{ marginBottom: 12 }}>
          No FAQs yet. Add questions people search for about this topic.
        </p>
      )}

      {faqs.map((faq, i) => (
        <div key={i} className={styles.faqItem}>
          <div className={styles.row} style={{ justifyContent: "space-between", marginBottom: 8 }}>
            <strong className={styles.small}>FAQ {i + 1}</strong>
            <div className={styles.row} style={{ gap: 2 }}>
              <button type="button" className={styles.toolButton} onClick={() => move(i, -1)} disabled={i === 0} title="Move up" aria-label={`Move FAQ ${i + 1} up`}>
                ↑
              </button>
              <button type="button" className={styles.toolButton} onClick={() => move(i, 1)} disabled={i === faqs.length - 1} title="Move down" aria-label={`Move FAQ ${i + 1} down`}>
                ↓
              </button>
              <button type="button" className={`${styles.buttonLink} ${styles.buttonLinkDanger}`} onClick={() => remove(i)}>
                Remove
              </button>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`faq-q-${i}`}>
              Question
              <span className={styles.hint}>{faq.question.length} / 300</span>
            </label>
            <input
              id={`faq-q-${i}`}
              className={styles.input}
              value={faq.question}
              maxLength={300}
              onChange={(e) => update(i, "question", e.target.value)}
              placeholder="e.g. How long does it take to install a security door?"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`faq-a-${i}`}>
              Answer
              <span className={styles.hint}>{faq.answer.length} / 3000</span>
            </label>
            <textarea
              id={`faq-a-${i}`}
              className={styles.textarea}
              rows={3}
              value={faq.answer}
              maxLength={3000}
              onChange={(e) => update(i, "answer", e.target.value)}
              placeholder="A clear, direct answer in 2–4 sentences."
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        className={styles.button}
        onClick={() => onChange([...faqs, { question: "", answer: "" }])}
        disabled={faqs.length >= 30}
      >
        + Add FAQ
      </button>
    </div>
  );
}
