import { connection, NextResponse } from "next/server";
import { wedding } from "@/lib/wedding";

type Wish = { name: string; message: string };

export async function GET() {
  await connection();
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    return NextResponse.json(
      { wishes: wedding.seedWishes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  }

  try {
    const url = new URL(scriptUrl);
    url.searchParams.set("action", "wishes");

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Apps Script responded ${res.status}`);
    }

    const data = (await res.json()) as { wishes?: Wish[] };
    const wishes =
      Array.isArray(data.wishes) && data.wishes.length > 0
        ? data.wishes.filter(
            (w) =>
              typeof w?.name === "string" &&
              typeof w?.message === "string" &&
              w.message.trim().length > 0,
          )
        : [...wedding.seedWishes];

    return NextResponse.json(
      { wishes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      },
    );
  } catch (err) {
    console.error("[wishes] Fetch failed:", err);
    return NextResponse.json(
      { wishes: wedding.seedWishes },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      },
    );
  }
}
