import { NextResponse } from "next/server";
import { jsx } from "react/jsx-runtime";
import { Resend } from "resend";

import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { inquirySchema } from "@/schemas/inquirySchema";
import WelcomeEmail from "@/emails/WelcomeEmail";


export async function POST(request) {
  try {
    // 1. Parse request body
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 },
      );
    }

    // 2. Validate data
    const validation = inquirySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your submitted information.",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, message } = validation.data;

    // 3. Connect to MongoDB
    await connectDB();

    // 4. Save inquiry first
    const inquiry = await Inquiry.create({
      name,
      email: email.toLowerCase(),
      message,
      status: "new",
      emailStatus: "pending",
    });

    let emailSent = false;

    // 5. Send welcome email
    try {
      const {
        RESEND_API_KEY,
        RESEND_FROM_EMAIL,
        CONTACT_REPLY_TO_EMAIL,
        PORTFOLIO_URL,
      } = process.env;

      if (
        !RESEND_API_KEY ||
        !RESEND_FROM_EMAIL ||
        !CONTACT_REPLY_TO_EMAIL ||
        !PORTFOLIO_URL
      ) {
        throw new Error("Email environment variables are missing.");
      }

      const resend = new Resend(RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [email],
        replyTo: CONTACT_REPLY_TO_EMAIL,
        subject: "Thanks for reaching out to IRONVAULT!",
        react: jsx(WelcomeEmail, {
          name,
          portfolioUrl: PORTFOLIO_URL,
          contactEmail: CONTACT_REPLY_TO_EMAIL,
        }),
      });
      if (error) {
        throw new Error(error.message);
      }

      emailSent = true;
      console.log("Welcome email accepted by Resend:", data?.id);
    } catch (emailError) {
      console.error("Welcome email failed:", emailError);
    }

    // 6. Update email status
    try {
      await Inquiry.findByIdAndUpdate(inquiry._id, {
        emailStatus: emailSent ? "sent" : "failed",
      });
    } catch (statusError) {
      console.error("Could not update email status:", statusError);
    }

    // 7. Return response
    return NextResponse.json(
      {
        success: true,
        emailSent,
        message: emailSent
          ? "Your inquiry has been received. Check your inbox!"
          : "Your inquiry has been received, but the confirmation email could not be sent.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Inquiry API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
