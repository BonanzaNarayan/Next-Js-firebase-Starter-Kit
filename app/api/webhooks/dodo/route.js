import { Webhooks } from "@dodopayments/nextjs";
import { FieldValue } from "firebase-admin/firestore";
import { resend } from "@/lib/resend";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

// --- Webhook Handler ---
export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET,

  onPayload: async (payload) => {
    try {
      const { type, data } = payload;

      // Firebase UID passed from checkout metadata
      const metadata = (data)?.metadata;
      const userId = metadata?.uid;
      const planInterval = metadata?.planInterval;
      const price = metadata?.price;
      const planName = metadata?.name;

      const { db } = getFirebaseAdmin();
      const userRef = db.collection("users").doc(userId);
      const userSnap = await userRef.get();
      const userEmail = userSnap.data()?.email;

      // const sendEmail = async (subject, html) => {
      //   if (userEmail) {
      //     await resend.emails.send({
      //       from: "<>", // Update with your domain
      //       to: userEmail,
      //       subject,
      //       html,
      //     });
      //   }
      // };

      switch (type) {
        // user paid → turn them pro
        case "payment.succeeded": {
          await userRef.update(
            {
              subscriptionStatus: "active", // Keeping my schema consistent
              plan: planName,
              updatedAt: FieldValue.serverTimestamp(),
              subscriptionId: data.subscription_id ?? null,
              planInterval: planInterval ?? null,
              price: price ?? null,
            }
          );

          console.log(`🔥 payment.succeeded → ${userId} is now PRO`);
          break;
        }

        // subscription ended → yeet them back to free
        case "subscription.cancelled": {
          await userRef.update(
            {
              subscriptionStatus: "inactive",
              plan: "free",
              updatedAt: FieldValue.serverTimestamp(),
            }
          );

          console.log(`💀 subscription.cancelled → ${userId} reverted to FREE`);
          break;
        }

        // Payment failed
        case "payment.failed": {
          await userRef.update(
            {
              subscriptionStatus: "inactive",
              plan: "free",
              updatedAt: FieldValue.serverTimestamp(),
            }
          );

          console.log(`💀 payment.failed → ${userId} reverted to FREE`);
          break;
        }

        // Subscription expired
        case "subscription.expired": {
          await userRef.update(
            {
              subscriptionStatus: "inactive",
              plan: "free",
              updatedAt: FieldValue.serverTimestamp(),
            }
          );

          console.log(`💀 subscription.expired → ${userId} reverted to FREE`);
          break;
        }

        // Subscription failed
        case "subscription.failed": {
          await userRef.update(
            {
              subscriptionStatus: "inactive",
              plan: "free",
              updatedAt: FieldValue.serverTimestamp(),
            }
          );

          console.log(`💀 subscription.failed → ${userId} reverted to FREE`);
          break;
        }

        // Subscription renewed
        case "subscription.renewed": {
          await userRef.update(
            {
              subscriptionStatus: "active",
              plan: planName,
              updatedAt: FieldValue.serverTimestamp(),
              planInterval: planInterval ?? null,
              price: price ?? null,
            }
          );

          console.log(`🔄 subscription.renewed → ${userId} is now PRO`);
          break;
        }

        // If Dodo ever gets fancy with new events
        default:
          console.log(`⚠️ Unhandled Dodo event: ${type}`);
      }
    } catch (err) {
      console.error("🔥 Webhook processing error:", err);
    }
  },
});
