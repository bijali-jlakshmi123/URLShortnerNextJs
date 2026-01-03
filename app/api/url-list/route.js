import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const urls = await prisma.url.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(urls, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
