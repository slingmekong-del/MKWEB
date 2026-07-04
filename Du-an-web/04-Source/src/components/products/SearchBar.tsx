"use client";

import { useMemo, useState } from "react";
import { suggest } from "@/lib/products";

type Props = {
  value: string;
  onChange: (q: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  // Ranked, accent-insensitive, English + Vietnamese (e.g. "ma ní", "pa lăng")
  const matches = useMemo(() => suggest(value), [value]);
  const suggestions = focused ? matches : [];

  return (
    <div className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search by name, WLL, brand, code — English or Vietnamese (e.g. ma ní, cáp bản, 50t, Green Pin)"
          className="w-full pl-9 pr-4 py-3 border border-slate-border rounded-lg text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30 bg-white"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/30 hover:text-navy"
          >
            ✕
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-slate-border rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((p) => (
            <button
              key={p.id}
              onMouseDown={() => { onChange(p.name); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-light text-left transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="font-heading font-semibold text-navy text-sm truncate">
                  {p.name}
                </div>
                <div className="font-mono text-teal-dark text-xs">{p.wText}</div>
              </div>
              <span className="font-mono text-[10px] text-navy/40 uppercase shrink-0">
                {p.categoryLabel}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
