import { NextRequest, NextResponse } from "next/server";

// server error
export const serverError = (req: NextRequest) => {
    return new NextResponse(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
    });
}