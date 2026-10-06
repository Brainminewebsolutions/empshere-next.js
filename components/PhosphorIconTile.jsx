// Shared section-icon badge: a Phosphor icon (https://phosphoricons.com) in white
// on the brand amber (#EFB000) rounded tile. The /ssr entry works in both server
// and client components.
export const ICON_TILE_BG = "#EFB000";

export default function PhosphorIconTile({
  icon: Icon,
  className = "h-12 w-12 rounded-xl",
  iconClassName = "h-6 w-6",
  weight = "fill",
  label,
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center text-white ${className}`}
      style={{ backgroundColor: ICON_TILE_BG }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Icon weight={weight} className={iconClassName} aria-hidden="true" />
    </span>
  );
}
