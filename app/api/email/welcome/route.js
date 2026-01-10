import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    const email = decodedToken.email;
    const name = decodedToken.name || "User";

    await resend.emails.send({
      from: "onboarding@resend.dev", // Update with your domain
      to: email,
      subject: "Welcome to SaaS Boilerplate!",
      html: `<p>Hi ${name},</p><p>Welcome to SaaS Boilerplate! We are excited to have you on board.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
