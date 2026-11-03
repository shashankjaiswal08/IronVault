const mailchimp = require("@mailchimp/mailchimp_marketing");

const requiredEnv = [
  "MAILCHIMP_API_KEY",
  "MAILCHIMP_SERVER_PREFIX",
  "MAILCHIMP_AUDIENCE_ID",
];

const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length) {
  console.error("Missing environment variables:", missing.join(", "));
  process.exit(1);
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

async function testConnection() {
  try {
    const response = await mailchimp.ping.get();

    console.log("Mailchimp connection successful!");
    console.log(response);
  } catch (error) {
    console.error("Mailchimp connection failed.");

    console.error(error.response?.body || error.message || "Unknown error");

    process.exit(1);
  }
}

testConnection();
