import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const configuration = await db.configuration.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!configuration) {
      return new NextResponse("Configuration not found", { status: 404 });
    }

    return NextResponse.json(configuration);
  } catch (error) {
    console.error("Error fetching configuration:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
