import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const configuration = await db.configuration.findUnique({
      where: {
        id: context.params.id,
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
