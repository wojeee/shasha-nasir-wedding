"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type RsvpContextValue = {
  isOpen: boolean;
  openRsvp: () => void;
  closeRsvp: () => void;
};

const RsvpContext = createContext<RsvpContextValue | null>(null);

export function RsvpProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRsvp = useCallback(() => setIsOpen(true), []);
  const closeRsvp = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openRsvp, closeRsvp }),
    [isOpen, openRsvp, closeRsvp],
  );

  return (
    <RsvpContext.Provider value={value}>{children}</RsvpContext.Provider>
  );
}

export function useRsvp() {
  const ctx = useContext(RsvpContext);
  if (!ctx) {
    throw new Error("useRsvp must be used within RsvpProvider");
  }
  return ctx;
}
