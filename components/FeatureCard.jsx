/* --------------------------------------------------------------------
   Feature card in the home page "Change From legacy system" style:
   index number top-right, soft-gold icon tile that turns solid gold and
   tilts on hover (with a pulsing ring), centred title + copy, a light
   sweep across the card and an underline that grows from the centre.
   Styles live in app/globals.css under `.em-card`.

   The reveal animation sits on the outer <li> (pass the page's reveal
   classes + stagger style) so its delay never slows the hover effects.
   -------------------------------------------------------------------- */

export default function FeatureCard({
  index,
  icon,
  title,
  text,
  eyebrow,
  value,
  showNumber = true,
  compact = false,
  titleAs: Title = "h3",
  className = "",
  style,
}) {
  return (
    <li className={`em-card-item ${className}`} style={style}>
      <article className={`em-card ${compact ? "em-card--compact" : ""}`}>
        {showNumber && index != null && (
          <span className="em-card-num" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {icon && (
          <span className="em-card-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {eyebrow && <p className="em-card-eyebrow">{eyebrow}</p>}
        {value != null && <span className="em-card-value">{value}</span>}
        {title && <Title className="em-card-title">{title}</Title>}
        {text && <p className="em-card-text">{text}</p>}
        <span className="em-card-bar" aria-hidden="true" />
      </article>
    </li>
  );
}
