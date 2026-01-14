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

      const userRef = getFirebaseAdmin().collection("users").doc(userId);
      const userSnap = await userRef.get();
      const userEmail = userSnap.data()?.email;

      const sendEmail = async (subject, html) => {
        if (userEmail) {
          await resend.emails.send({
            from: "payments@resend.dev", // Update with your domain
            to: userEmail,
            subject,
            html,
          });
        }
      };

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
            },
            { merge: true }
          );

          await sendEmail(
            "Payment Successful - Pro Plan Activated",
            "<p>Your payment was successful and your Pro plan is now active!</p>"
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
            },
            { merge: true }
          );

          await sendEmail(
            "Subscription Cancelled",
            "<p>Your subscription has been cancelled. You have been reverted to the free plan.</p>"
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
            },
            { merge: true }
          );

          await sendEmail(
            "Payment Failed",
            "<p>Your payment failed. Please update your payment method.</p>"
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
            },
            { merge: true }
          );

          await sendEmail(
            "Subscription Expired",
            "<p>Your subscription has expired.</p>"
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
            },
            { merge: true }
          );

          await sendEmail(
            "Subscription Payment Failed",
            "<p>Your subscription renewal failed.</p>"
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
            },
            { merge: true }
          );

          await sendEmail(
            "Subscription Renewed",
            "<p>Your subscription has been successfully renewed.</p>"
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
