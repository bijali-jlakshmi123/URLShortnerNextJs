import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { urlId } = await req.json();
    const url = await prisma.url.update({
      where: {
        id: urlId,
      },
      data: {
        visits: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(url, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
