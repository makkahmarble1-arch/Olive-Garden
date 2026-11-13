"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { starFillStyle } from "./StarRating";
import { applyVote, useProductRating } from "./rating-store";
import { submitVote, VOTING_OPEN } from "@/lib/rating-vote";

type RatingSummaryProps = {
  /** Canonical product id (content/menu/products.ts). Shared products show the same rating. */
  productId: string;
  /** Visible item name, used in accessible labels. */
  itemName: string;
  /** Horizontal alignment of the row. Cards: center (default); tables: start. */
  align?: "center" | "start";
  /** Extra classes for the wrapper (spacing). */
  className?: string;
};

type VoteState =
  | { status: "idle" }
  | { status: "submitting"; stars: number }
  | { status: "done"; message: string };

/** Short feedback after a vote. "Saved" only when the server confirmed it. */
const SAVED_MESSAGE = {
  created: "Thanks for rating!",
  updated: "Rating updated",
  unchanged: "Rating already saved",
} as const;

/**
 * Always-visible rating row: five individually selectable golden stars,
 * then "(0)" when unrated or "4.3 (12)" with real votes (on phone cards the
 * numbers sit on a second line). Fixed height and
 * reserved text width, so nothing shifts while ratings load. Keyboard: one
 * Tab stop; Left/Right/Home/End move between stars; Enter/Space choose.
 */
export default function RatingSummary({ productId, itemName, align = "center", className = "" }: RatingSummaryProps) {
  const rating = useProductRating(productId);
  const [hover, setHover] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [vote, setVote] = useState<VoteState>({ status: "idle" });
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const labelId = useId();

  // Hide the short feedback text again after a few seconds.
  useEffect(() => {
    if (vote.status !== "done") return;
    const timer = window.setTimeout(() => setVote({ status: "idle" }), 3500);
    return () => window.clearTimeout(timer);
  }, [vote]);

  const ready = rating.status === "ready" ? rating.rating : null;
  const average = ready ? ready.average : 0;
  // Golden preview: hovered star while voting is open, chosen star while saving.
  const display = vote.status === "submitting" ? vote.stars : VOTING_OPEN && hover ? hover : average;

  let visibleText: string;
  let description: string;
  if (rating.status === "loading") {
    visibleText = "(0)";
    description = "Rating loading";
  } else if (rating.status === "error") {
    visibleText = "(–)";
    description = "Ratings unavailable";
  } else if (ready) {
    const votes = `${ready.count.toLocaleString("en-US")} rating${ready.count === 1 ? "" : "s"}`;
    visibleText = `${ready.average.toFixed(1)} (${ready.count.toLocaleString("en-US")})`;
    description = `${ready.average.toFixed(1)} out of 5 stars, ${votes}`;
  } else {
    visibleText = "(0)";
    description = "Not rated yet, 0 ratings";
  }

  async function choose(stars: number) {
    if (vote.status === "submitting" || !VOTING_OPEN) return;
    setVote({ status: "submitting", stars });
    const result = await submitVote(productId, stars);
    if (result.status === "saved") {
      // Updates every card that shares this rating key.
      applyVote(result.ratingKey, { average: result.average, count: result.count });
      setVote({ status: "done", message: SAVED_MESSAGE[result.result] });
    } else {
      setVote({
        status: "done",
        message: result.status === "rate_limited" ? "Too many ratings. Try later" : "Not saved. Please try again",
      });
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
    // Start from the star that really has focus (robust for fast key repeats).
    const focused = buttons.current.indexOf(document.activeElement as HTMLButtonElement);
    const current = focused >= 0 ? focused : focusIndex;
    let next: number;
    if (event.key in moves) next = Math.max(0, Math.min(4, current + moves[event.key]));
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 4;
    else return;
    event.preventDefault();
    setFocusIndex(next);
    buttons.current[next]?.focus();
  }

  const feedback = vote.status === "submitting" ? "Saving…" : vote.status === "done" ? vote.message : null;

  return (
    <div
      className={`relative flex items-center ${
        align === "center"
          ? // Cards: on narrow 2-column phones the numbers sit under the stars, so every card has the same height.
            "flex-col justify-center max-sm:gap-0.5 sm:min-h-6 sm:flex-row sm:gap-x-1.5"
          : "min-h-6 flex-wrap justify-start gap-x-1.5"
      } ${className}`}
    >
      <div
        role="group"
        aria-labelledby={labelId}
        aria-busy={vote.status === "submitting"}
        className={`flex items-center transition-opacity ${vote.status === "submitting" ? "opacity-60" : ""}`}
        onKeyDown={onKeyDown}
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((stars, index) => (
          <button
            key={stars}
            ref={(el) => {
              buttons.current[index] = el;
            }}
            type="button"
            tabIndex={index === focusIndex ? 0 : -1}
            aria-label={`Rate ${stars} out of 5 stars`}
            disabled={vote.status === "submitting"}
            onClick={() => choose(stars)}
            onMouseEnter={() => setHover(stars)}
            onFocus={() => setFocusIndex(index)}
            className="og-star-btn"
            style={starFillStyle(display - index)}
          />
        ))}
      </div>
      <span aria-hidden="true" className={`text-xs leading-4 text-muted tabular-nums ${rating.status === "loading" ? "invisible" : ""}`}>
        {visibleText}
      </span>
      <span id={labelId} className="sr-only">
        Rating for {itemName}: {description}.{VOTING_OPEN ? " Choose 1 to 5 stars to rate." : " Voting opens soon."}
      </span>
      <span role="status" className="sr-only">
        {feedback ?? ""}
      </span>
      {feedback && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-full z-10 mb-1 rounded bg-ink px-1.5 py-0.5 text-[0.7rem] leading-4 whitespace-nowrap text-white ${
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          }`}
        >
          {feedback}
        </span>
      )}
    </div>
  );
}
