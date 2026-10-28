import { NextRequest, NextResponse } from "next/server";
import { DB } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { phone, source, collaborator, templateId } = body;

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/[^0-9]/g, "");
    const existingUser = DB.findUserByPhone(cleanPhone);

    if (existingUser) {
      return NextResponse.json(
        {
          status: 201,
          data: {
            user_exist: true,
            email: existingUser.email,
            phone: existingUser.phone,
            name: existingUser.name,
          },
        },
        { status: 201 }
      );
    }

    const lead = DB.createLead({
      phone: cleanPhone,
      name: "Prospective Guardian",
      address: "Dhaka",
      description: templateId ? `Source: ${source || "direct"}, Template: ${templateId}` : `Source: ${source || "direct"}`,
    });

    return NextResponse.json(
      {
        status: 201,
        data: {
          user_exist: false,
          lead_id: lead.id,
          phone: cleanPhone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to process lead" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 200,
    data: DB.getLeads(),
  });
}
