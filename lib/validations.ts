export type RsvpInput = {
  guestName: string;
  contact: string;
  plusOne: boolean;
  plusOneName: string;
  wishes: string;
};

export type RsvpErrors = Partial<
  Record<"guestName" | "contact" | "plusOneName" | "form", string>
>;

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

  if (input.plusOne && !input.plusOneName.trim()) {
    errors.plusOneName = "Please enter your plus one's name.";
  }

  return errors;
}

export function normalizeRsvp(input: RsvpInput) {
  return {
    guestName: input.guestName.trim(),
    contact: input.contact.trim(),
    plusOne: input.plusOne,
    plusOneName: input.plusOne ? input.plusOneName.trim() : "",
    wishes: input.wishes.trim(),
  };
}
