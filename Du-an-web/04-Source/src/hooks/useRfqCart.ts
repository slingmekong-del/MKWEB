"use client";
import { useState, useEffect, useCallback } from "react";

const KEY = "mekong_rfq";

function load(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function persist(ids: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify(Array.from(ids)));
}

export function useRfqCart() {
  const [ids, setIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIds(load());
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      persist(next);
      return next;
    });
  }, []);

  return { ids, toggle, has: (id: string) => ids.has(id), count: ids.size };
}
