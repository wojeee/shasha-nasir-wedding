/** Total people in the party, including the guest who is RSVPing. */
export const MAX_PARTY_SIZE = 4;

export type RsvpInput = {
  guestName: string;
  contact: string;
  partySize: number;
  /** Names of people coming with the guest. Length is partySize - 1. */
  companions: string[];
  wishes: string;
};

export type RsvpErrors = Partial<
  Record<"guestName" | "contact" | "partySize" | "form", string>
> & {
  companions?: string[];
};

export function companionCount(partySize: number): number {
  if (!Number.isInteger(partySize) || partySize < 1) return 0;
  return Math.min(partySize, MAX_PARTY_SIZE) - 1;
}

export function validateRsvp(input: RsvpInput): RsvpErrors {
  const errors: RsvpErrors = {};

  if (!input.guestName.trim()) {
    errors.guestName = "Please enter your name.";
  }

  if (!input.contact.trim()) {
    errors.contact = "Please enter your contact number.";
  } else if (!/^[\d\s+\-()]{7,20}$/.test(input.contact.trim())) {
    errors.contact = "Please enter a valid contact number.";
  }

  if (
    !Number.isInteger(input.partySize) ||
    input.partySize < 1 ||
    input.partySize > MAX_PARTY_SIZE
  ) {
    errors.partySize = `Please choose between 1 and ${MAX_PARTY_SIZE} guests, including yourself.`;
  } else {
    const needed = input.partySize - 1;
    const companionErrors: string[] = [];
    let hasCompanionError = false;
    for (let i = 0; i < needed; i++) {
      const name = (input.companions[i] ?? "").trim();
      if (!name) {
        companionErrors[i] = "Please enter this guest's name.";
        hasCompanionError = true;
      } else {
        companionErrors[i] = "";
      }
    }
    if (hasCompanionError) errors.companions = companionErrors;
  }

  return errors;
}

export function normalizeRsvp(input: RsvpInput) {
  const partySize = Math.min(
    Math.max(Math.trunc(input.partySize), 1),
    MAX_PARTY_SIZE,
  );
  const companions = input.companions
    .slice(0, partySize - 1)
    .map((name) => name.trim());

  return {
    guestName: input.guestName.trim(),
    contact: input.contact.trim(),
    partySize,
    companions,
    wishes: input.wishes.trim(),
  };
}
