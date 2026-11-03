import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { connectDB } from "@/lib/db";
import Inquiry from "@/models/Inquiry";


// Verify Mailchimp's HMAC-SHA256 signature.
function verifyMailchimpSignature(rawBody, signatureHeader, secret) {
  if (!signatureHeader || !secret) {
    return false;
  }

  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => {
      const [key, ...values] = part.trim().split("=");

      return [key, values.join("=")];
    }),
  );

  const timestamp = parts.t;
  const receivedSignature = parts.v1;

  if (
    !timestamp ||
    !/^\d+$/.test(timestamp) ||
    !receivedSignature ||
    !/^[a-f0-9]{64}$/i.test(receivedSignature)
  ) {
    return false;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (Math.abs(currentTimestamp - Number(timestamp)) > 300) {
    return false;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.`)
    .update(rawBody)
    .digest();

  const receivedBuffer = Buffer.from(receivedSignature, "hex");

  if (expectedSignature.length !== receivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedSignature, receivedBuffer);
}

// GET: Mailchimp checks whether the webhook URL is reachable.
export async function GET() {
  return new Response("Mailchimp webhook endpoint is active.", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

// POST: Receive Mailchimp audience events.
export async function POST(request) {
  try {
    const webhookSecret = process.env.MAILCHIMP_WEBHOOK_SIGNING_SECRET;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    if (!webhookSecret || !audienceId) {
      console.error("[Mailchimp Webhook] Missing environment variables.");
      return NextResponse.json(
        {
          success: false,
          message: "Webhook configuration error.",
        },
        { status: 500 },
      );
    }

    const contentType = request.headers.get("content-type") || "";
    if (
      !contentType.toLowerCase().includes("application/x-www-form-urlencoded")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported content type.",
        },
        { status: 415 },
      );
    }

    // Read the original request bytes before parsing.
    const rawBody = Buffer.from(await request.arrayBuffer());
    if (rawBody.length > 64 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Request body too large.",
        },
        { status: 413 },
      );
    }
    console.info("[Mailchimp Webhook] Request received:", {
      contentType,
      hasSignature: Boolean(request.headers.get("x-mailchimp-signature")),
    });

    // Verify signature before processing the event.
    const signatureHeader = request.headers.get("x-mailchimp-signature");
    const isValid = verifyMailchimpSignature(
      rawBody,
      signatureHeader,
      webhookSecret,
    );
    if (!isValid) {
      console.warn("[Mailchimp Webhook] Signature verification failed.");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid webhook signature.",
        },
        { status: 401 },
      );
    }

    // Parse the form-encoded payload.
    const params = new URLSearchParams(rawBody.toString("utf8"));
    const eventType = params.get("type");
    console.info("[Mailchimp Webhook] Event received:", {
      eventType,
      hasEmail: Boolean(params.get("data[email]")),
      hasAudienceId: Boolean(params.get("data[list_id]")),
    });

    // Ignore events unrelated to unsubscribe.
    if (eventType !== "unsubscribe") {
      console.info("[Mailchimp Webhook] Ignoring event:", eventType);
      return NextResponse.json({
        success: true,
        message: "Event ignored.",
      });
    }

    // Support flattened and JSON-encoded event data.
    let parsedData = {};
    const dataString = params.get("data");
    if (dataString) {
      try {
        parsedData = JSON.parse(dataString);
      } catch {
        console.warn("[Mailchimp Webhook] Invalid JSON event data.");
        return NextResponse.json(
          {
            success: false,
            message: "Invalid event data.",
          },
          { status: 400 },
        );
      }
    }

    const email = params.get("data[email]") || parsedData.email;
    const listId = params.get("data[list_id]") || parsedData.list_id;
    if (
      typeof email !== "string" ||
      typeof listId !== "string" ||
      !email.trim()
    ) {
      console.warn("[Mailchimp Webhook] Missing email or audience ID.");
      return NextResponse.json(
        {
          success: false,
          message: "Missing event details.",
        },
        { status: 400 },
      );
    }

    // Verify that this event belongs to our audience.
    if (listId !== audienceId) {
      console.warn("[Mailchimp Webhook] Audience ID mismatch.");
      return NextResponse.json(
        {
          success: false,
          message: "Unknown audience.",
        },
        { status: 403 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    // Connect to MongoDB.
    await connectDB();
    // Synchronize all matching inquiry records.
    const result = await Inquiry.updateMany(
      {
        email: normalizedEmail,
        marketingOptIn: true,
      },
      {
        $set: {
          marketingStatus: "unsubscribed",
        },
      },
    );
    console.info("[Mailchimp Webhook] MongoDB result:", {
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });

    return NextResponse.json({
      success: true,
      message: "Unsubscribe synchronized.",
      matchedRecords: result.matchedCount,
      updatedRecords: result.modifiedCount,
    });
  } catch (error) {
    console.error("[Mailchimp Webhook] Processing failed:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing failed.",
      },
      { status: 500 },
    );
  }
}


