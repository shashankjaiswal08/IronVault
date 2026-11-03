"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

import { inquirySchema } from "@/schemas/inquirySchema";

export default function ContactForm() {
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    setServerMessage("");
    setServerError("");
    setEmailSent(false);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit your inquiry.");
      }

      setServerMessage(result.message);
      setEmailSent(result.emailSent);

      reset();
    } catch (error) {
      setServerError(
        error.message || "Something went wrong. Please try again.",
      );
    }
  };

  const inputClasses =
    "w-full border-b border-white/20 bg-transparent px-0 py-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-[#A7E400]";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full space-y-8"
    >
      {/* Full name */}
      <div>
        <label
          htmlFor="name"
          className="mb-3 block text-sm font-medium text-white"
        >
          Full Name
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
          className={inputClasses}
        />

        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-3 block text-sm font-medium text-white"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className={inputClasses}
        />

        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-3 block text-sm font-medium text-white"
        >
          Your Message
        </label>

        <textarea
          id="message"
          rows={5}
          placeholder="Tell me about your project..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
          className={`${inputClasses} resize-y`}
        />

        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Response messages */}
      <div aria-live="polite" aria-atomic="true">
        {serverMessage && (
          <p
            className={
              emailSent ? "text-sm text-[#A7E400]" : "text-sm text-amber-400"
            }
          >
            {serverMessage}
          </p>
        )}

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex items-center gap-4 bg-[#A7E400] px-7 py-4 text-sm font-bold tracking-wider text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            SENDING
            <LoaderCircle size={18} className="animate-spin" />
          </>
        ) : (
          <>
            SEND INQUIRY
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </>
        )}
      </button>
    </form>
  );
}
  