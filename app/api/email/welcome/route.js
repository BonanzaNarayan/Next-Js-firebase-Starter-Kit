import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await getFirebaseAdmin().verifyIdToken(token);
    const email = decodedToken.email;

    await resend.emails.send({
      from: "onboarding@resend.dev", // Update with your domain
      to: email,
      subject: "Welcome to SaaS Boilerplate!",
      html: `<h1>Hi,</h1><p>Welcome to the family! We are excited to have you on board.</p><p>NextFire</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
