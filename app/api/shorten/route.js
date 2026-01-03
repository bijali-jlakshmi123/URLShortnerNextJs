import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { nanoid } from "nanoid";

export async function POST(req) {
  try {
    const body = await req.json();

    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "Missing URL" }, { status: 400 });
    }

    const shortCode = nanoid(6);

    console.log(shortCode);

    const newUrl = await prisma.url.create({
      data: {
        shortCode: shortCode,
        originalUrl: url,
      },
    });

    return NextResponse.json(
      {
        id: newUrl.id,
        shortCode: newUrl.shortCode,
        message: "URL shortened successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
