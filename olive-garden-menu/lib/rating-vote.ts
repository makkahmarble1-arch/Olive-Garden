import type { VoteResponse } from "@/lib/rating-types";

/**
 * Browser side of voting: sends the vote to our own server API
 * (/api/ratings/vote). The server identifies the visitor with its own
 * HttpOnly cookie; the browser never sends any id. A vote is shown as saved
 * only when the server confirms it.
 */
export type VoteResult =
  | { status: "saved"; result: "created" | "updated" | "unchanged"; ratingKey: string; average: number; count: number }
  | { status: "rate_limited" }
  | { status: "error" };

/** Voting is live (Lesson 7.4.5). */
export const VOTING_OPEN = true;

export async function submitVote(productId: string, stars: number): Promise<VoteResult> {
  try {
    const res = await fetch("/api/ratings/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating: stars }),
      credentials: "same-origin",
    });
    const data = (await res.json()) as VoteResponse;
    if (data.ok) {
      return { status: "saved", result: data.result, ratingKey: data.ratingKey, average: data.average, count: data.count };
    }
    return data.error === "rate_limited" ? { status: "rate_limited" } : { status: "error" };
  } catch {
    return { status: "error" };
  }
}
