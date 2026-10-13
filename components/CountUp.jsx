/* --------------------------------------------------------------------
   Static Number Display
   Renders numbers statically with zero count-up animation.
   -------------------------------------------------------------------- */

export default function CountUp({ end, suffix = "", className = "", ...props }) {
  const formatted =
    typeof end === "number" ? end.toLocaleString("en-IN") : String(end ?? "");
  return (
    <span className={`tabular-nums ${className}`} {...props}>
      {formatted}
      {suffix}
    </span>
  );
}
