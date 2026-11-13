"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { RatingsPayload, RatingSummaryData } from "@/lib/rating-types";

/**
 * Browser-side rating store, shared by every rating on the page (no
 * provider component needed):
 * - ONE request to /api/ratings per page view (one retry only if it failed).
 * - Ratings are stored per rating key, so products that share a rating
 *   (confirmed aliases) always show the same numbers.
 * - After a vote, `applyVote()` updates that key and only the cards that
 *   use it re-render.
 */
type Status = "loading" | "ready" | "error";

let status: Status = "loading";
let keys: Record<string, string> = {};
let byKey: Record<string, RatingSummaryData> = {};
let started = false;
const listeners = new Set<() => void>();

export type ProductRating =
  | { status: "loading" | "error" }
  | { status: "ready"; rating: RatingSummaryData | null };

// Snapshot cache: the same object is returned until something changes for
// that rating key, so useSyncExternalStore skips unaffected cards.
const snapshots = new Map<string, ProductRating>();

function emit(changedKey?: string) {
  if (changedKey) snapshots.delete(changedKey);
  else snapshots.clear();
  listeners.forEach((listener) => listener());
}

export function ratingKeyOf(productId: string): string {
  return keys[productId] ?? productId;
}

async function fetchRatings(): Promise<RatingsPayload> {
  // "no-cache": the browser must ask the server every time (the server's
  // own 1-minute cache keeps it fast), so a refresh after voting never shows
  // an older copy from the browser's disk cache.
  const res = await fetch("/api/ratings", { cache: "no-cache" });
  if (!res.ok) throw new Error(String(res.status));
  const payload = (await res.json()) as RatingsPayload;
  if (!payload.available) throw new Error("unavailable");
  return payload;
}

function load() {
  if (started) return;
  started = true;
  fetchRatings()
    .catch(() => new Promise<RatingsPayload>((resolve, reject) => setTimeout(() => fetchRatings().then(resolve, reject), 4000)))
    .then((payload) => {
      keys = payload.keys ?? {};
      byKey = payload.ratings;
      status = "ready";
      emit();
    })
    .catch(() => {
      status = "error";
      emit();
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  load();
  return () => listeners.delete(listener);
}

const LOADING: ProductRating = { status: "loading" };
const ERROR: ProductRating = { status: "error" };

function snapshotFor(productId: string): ProductRating {
  if (status === "loading") return LOADING;
  if (status === "error") return ERROR;
  const key = ratingKeyOf(productId);
  let snap = snapshots.get(key);
  if (!snap) {
    snap = { status: "ready", rating: byKey[key] ?? null };
    snapshots.set(key, snap);
  }
  return snap;
}

/** Rating of one product: `rating: null` = no votes yet. */
export function useProductRating(productId: string): ProductRating {
  const getSnapshot = useCallback(() => snapshotFor(productId), [productId]);
  return useSyncExternalStore(subscribe, getSnapshot, () => LOADING);
}

/** Saves the server's new totals for a rating key (after a successful vote). */
export function applyVote(ratingKey: string, rating: RatingSummaryData) {
  byKey = { ...byKey, [ratingKey]: rating };
  if (status !== "ready") status = "ready";
  emit(ratingKey);
}
