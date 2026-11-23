"use client";

import { Plus, X } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-ivory-dim/55">
          {label}
        </span>
        {hint && <span className="text-[9.5px] text-ivory-dim/30">{hint}</span>}
      </span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

const base =
  "w-full rounded-sm border border-white/10 bg-white/[0.025] px-3.5 py-2.5 text-[13px] text-ivory outline-none transition-colors duration-300 placeholder:text-ivory-dim/25 focus:border-gold/60 focus:bg-white/[0.04]";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(base, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(base, "resize-y leading-relaxed", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(base, "appearance-none bg-ink-2 [&>option]:bg-ink-2", className)}
      {...props}
    >
      {children}
    </select>
  );
}

export function AddButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/20 px-4 py-2 text-[11px] text-ivory-dim/70 transition-colors duration-300 hover:border-gold/50 hover:text-gold disabled:opacity-40"
    >
      <Plus className="size-3.5" />
      {children}
    </button>
  );
}

export function RemoveButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-7 shrink-0 place-items-center rounded-full border border-white/10 text-ivory-dim/40 transition-colors hover:border-red-400/40 hover:text-red-300"
    >
      <X className="size-3.5" />
    </button>
  );
}

export function EditorCard({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 rounded-sm border border-white/10 bg-white/[0.012] p-4 sm:p-5">
      {children}
    </div>
  );
}

export function GroupTitle({
  children,
  count,
  action,
}: {
  children: ReactNode;
  count?: number;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <div className="flex items-baseline gap-2.5">
        <h3 className="font-serif text-xl text-ivory">{children}</h3>
        {typeof count === "number" && (
          <span className="text-[10px] text-ivory-dim/40">{count} ta</span>
        )}
      </div>
      {action}
    </div>
  );
}
