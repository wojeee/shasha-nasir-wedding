import { NextResponse } from "next/server";
import {
  normalizeRsvp,
  validateRsvp,
  type RsvpInput,
} from "@/lib/validations";

export async function POST(request: Request) {
  let body: Partial<RsvpInput>;

  try {
    body = (await request.json()) as Partial<RsvpInput>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const input: RsvpInput = {
    guestName: typeof body.guestName === "string" ? body.guestName : "",
    contact: typeof body.contact === "string" ? body.contact : "",
    plusOne: Boolean(body.plusOne),
    plusOneName: typeof body.plusOneName === "string" ? body.plusOneName : "",
    wishes: typeof body.wishes === "string" ? body.wishes : "",
  };

  const errors = validateRsvp(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 400 });
  }

  const payload = normalizeRsvp(input);
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    // Allow local UI testing without Sheets configured
    if (process.env.NODE_ENV === "development") {
      console.info("[rsvp] GOOGLE_SCRIPT_URL unset — accepted locally:", payload);
      return NextResponse.json({ ok: true, mocked: true });
    }
    return NextResponse.json(
      { error: "RSVP service is not configured yet." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "rsvp",
        timestamp: new Date().toISOString(),
        guestName: payload.guestName,
        contact: payload.contact,
        plusOne: payload.plusOne ? "Yes" : "No",
        plusOneName: payload.plusOneName,
        wishes: payload.wishes,
        displayWish: payload.wishes ? "TRUE" : "FALSE",
      }),
      redirect: "follow",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[rsvp] Apps Script error:", res.status, text);
      return NextResponse.json(
        { error: "Could not save your RSVP. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[rsvp] Forward failed:", err);
    return NextResponse.json(
      { error: "Could not reach the RSVP service." },
      { status: 502 },
    );
  }
}
