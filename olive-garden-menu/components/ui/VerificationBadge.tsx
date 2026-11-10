type VerificationBadgeProps = {
  label?: string;
};

/** Shown wherever data is missing or unverified. Uses text, not only color. */
export default function VerificationBadge({
  label = "Not verified yet",
}: VerificationBadgeProps) {
  return (
    <span className="inline-block rounded-full bg-warning-bg px-2.5 py-0.5 text-sm font-medium whitespace-nowrap text-warning-text">
      {label}
    </span>
  );
}
