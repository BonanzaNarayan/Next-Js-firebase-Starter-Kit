import { Checkout } from "@dodopayments/nextjs";
import { NextRequest } from "next/server";

export const POST = async (req) => {
  try {
    const handler = Checkout({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      returnUrl: `http://localhost:3000/dashboard`, // redirect after payment
      environment: "test_mode",
      type: "session",
    });

    return handler(req); // handler will parse req.body itself
  } catch (err) {
    console.error("Checkout handler error:", err);
    return new Response("Internal server error", { status: 500 });
  }
};
