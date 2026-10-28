import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, name, address, description, source } = body;

    if (!phone || phone.length < 11) {
      return NextResponse.json(
        { status: 400, message: "Valid 11-digit phone number is required" },
        { status: 400 }
      );
    }

    const lead = DB.createLead({
      phone,
      name: name || undefined,
      address: address || undefined,
      description: description || undefined,
      source: source || "web_direct",
    });

    return NextResponse.json(
      {
        status: 201,
        message: "Lead created successfully",
        data: { lead_id: lead.id },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Failed to create lead" },
      { status: 500 }
    );
  }
}
