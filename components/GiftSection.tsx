"use client";

import { useState } from "react";
import { wedding } from "@/lib/wedding";
import { Reveal } from "@/components/Reveal";

export function GiftSection() {
  const { gift } = wedding;
  const accounts = gift.accounts.filter((account) => account.accountNumber);
  const [showAccounts, setShowAccounts] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyAccount(id: string, accountNumber: string) {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <section className="relative px-6 py-24 sm:py-28">
      <div
        className="absolute inset-x-0 top-0 -z-10 h-full"
        style={{
          background:
            "linear-gradient(180deg, transparent, color-mix(in srgb, var(--warm-beige) 22%, transparent))",
        }}
      />
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <h2 className="font-serif text-3xl leading-snug text-[var(--deep-taupe)] sm:text-4xl md:text-5xl">
            {gift.heading}
          </h2>

          <p className="mx-auto mt-6 max-w-lg font-serif text-lg leading-relaxed text-[var(--deep-taupe)]/75">
            {accounts.length > 0
              ? gift.body
              : "Your presence at our wedding is the greatest gift."}
          </p>

          {accounts.length > 0 && !showAccounts ? (
            <button
              type="button"
              onClick={() => setShowAccounts(true)}
              className="mt-8 bg-[var(--deep-taupe)] px-8 py-3 font-sans text-xs uppercase tracking-[0.28em] text-[var(--champagne)] transition hover:bg-[var(--warm-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--deep-taupe)]"
            >
              Click Here
            </button>
          ) : null}

          {accounts.length > 0 && showAccounts ? (
            <div className="mt-12 text-left">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="border-b border-[var(--soft-gold)]/50 py-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-serif text-sm italic text-[var(--deep-taupe)]/60">
                        Account number
                      </p>
                      <p className="mt-1 font-serif text-xl text-[var(--deep-taupe)]">
                        {account.accountNumber}
                      </p>
                    </div>
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--warm-beige)]">
                      {account.bank}
                    </p>
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-serif text-sm italic text-[var(--deep-taupe)]/60">
                        Account name
                      </p>
                      <p className="mt-1 font-serif text-lg text-[var(--deep-taupe)]">
                        {account.accountName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        copyAccount(account.id, account.accountNumber)
                      }
                      className="shrink-0 border border-[var(--deep-taupe)]/40 px-3 py-2 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[var(--deep-taupe)] transition hover:bg-[var(--deep-taupe)] hover:text-[var(--champagne)]"
                    >
                      {copiedId === account.id ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <p className="mt-10 text-center font-serif text-lg leading-relaxed text-[var(--deep-taupe)]/80">
            {gift.addressNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
