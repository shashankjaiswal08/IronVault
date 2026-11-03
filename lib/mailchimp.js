import mailchimp from "@mailchimp/mailchimp_marketing";
import { createHash } from "node:crypto";

const apiKey = process.env.MAILCHIMP_API_KEY;
const server = process.env.MAILCHIMP_SERVER_PREFIX;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

if (!apiKey || !server || !audienceId) {
  throw new Error("Mailchimp environment variables are missing.");
}

mailchimp.setConfig({
  apiKey,
  server,
});

export function getSubscriberHash(email) {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}

export async function subscribeToMailchimp(email) {
  const normalizedEmail = email.trim().toLowerCase();

  const subscriberHash = getSubscriberHash(normalizedEmail);

  const response = await mailchimp.lists.setListMember(
    audienceId,
    subscriberHash,
    {
      email_address: normalizedEmail,
      status: "subscribed",
      status_if_new: "subscribed",
    },
  );

  return response.status;
}

export function getMailchimpErrorDetails(error) {
  const body = error?.response?.body;

  return {
    title: body?.title || error?.title || "",
    detail: body?.detail || error?.message || "",
    status: error?.status || error?.response?.status || null,
  };
}
