import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
} from "react-email";

export default function WelcomeEmail({ name, portfolioUrl, contactEmail }) {
  const contactUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
    "Website Development Inquiry",
  )}`;

  return (
    <Html lang="en">
      <Head />

      <Preview>
        {`Thanks for reaching out to IRONVAULT. Let's build something great.`}
      </Preview>

      <Body style={styles.body} className="font-bio-rhyme">
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Text style={styles.logo}>IRONVAULT</Text>

            <Text style={styles.tagline}>MAKE YOURSELF HARD AS IRON.</Text>
          </Section>

          {/* Email content */}
          <Section style={styles.content}>
            <Text style={styles.eyebrow}>THANK YOU FOR REACHING OUT</Text>

            <Heading as="h1" style={styles.heading}>
              Hey {name},
              <br />
              Thanks for stopping by.
            </Heading>

            <Text style={styles.paragraph}>
              Thank you for getting in touch through IRONVAULT. I appreciate
              your interest!
            </Text>

            <Text style={styles.paragraph}>
              {`Here's something you should know:`}
              <strong style={styles.highlight}>
                IRONVAULT is a portfolio project
              </strong>{" "}
              that I built to showcase my skills in modern web design and
              development.
            </Text>

            <Text style={styles.paragraph}>{`
              I'm also available to build professional websites for businesses,
              brands, and individuals. If you need a website or have an idea
              you'd like to bring to life, feel free to get in touch.`}
            </Text>

            <Button href={contactUrl} style={styles.button}>
              {`Let's build something great! →`}
            </Button>

            <Text style={styles.secondaryText}>
              Want to explore more of my work?
            </Text>

            <Link href={portfolioUrl} style={styles.portfolioLink}>
              Visit my portfolio →
            </Link>
          </Section>

          {/* Footer */}
          <Hr style={styles.divider} />

          <Section style={styles.footer}>
            <Text style={styles.footerName}>Shashank</Text>

            <Text style={styles.footerText}>
              Web Developer
              <br />
              Building digital experiences that make an impact.
            </Text>

            <Text style={styles.copyright}>
              © {new Date().getFullYear()} IRONVAULT. Portfolio project.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: 0,
    padding: "40px 16px",
    backgroundColor: "#101010",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  container: {
    maxWidth: "560px",
    margin: "0 auto",
    backgroundColor: "#171717",
    border: "1px solid #303030",
  },

  header: {
    padding: "28px 32px",
    borderBottom: "1px solid #303030",
  },

  logo: {
    margin: 0,
    color: "#A7E400",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  tagline: {
    margin: "7px 0 0",
    color: "#888888",
    fontSize: "10px",
    letterSpacing: "2px",
  },

  content: {
    padding: "36px 32px",
  },

  eyebrow: {
    margin: "0 0 16px",
    color: "#A7E400",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
  },

  heading: {
    margin: "0 0 22px",
    color: "#FFFFFF",
    fontSize: "30px",
    lineHeight: "1.3",
    fontWeight: "800",
  },

  paragraph: {
    margin: "0 0 18px",
    color: "#B8B8B8",
    fontSize: "15px",
    lineHeight: "1.8",
  },

  highlight: {
    color: "#FFFFFF",
  },

  button: {
    display: "inline-block",
    marginTop: "12px",
    padding: "15px 22px",
    backgroundColor: "#A7E400",
    color: "#101010",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
    textDecoration: "none",
  },

  secondaryText: {
    margin: "28px 0 10px",
    color: "#888888",
    fontSize: "13px",
  },

  portfolioLink: {
    color: "#A7E400",
    fontSize: "13px",
    textDecoration: "underline",
  },

  divider: {
    margin: 0,
    borderColor: "#303030",
  },

  footer: {
    padding: "24px 32px",
  },

  footerName: {
    margin: "0 0 6px",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "700",
  },

  footerText: {
    margin: 0,
    color: "#888888",
    fontSize: "12px",
    lineHeight: "1.7",
  },

  copyright: {
    margin: "22px 0 0",
    color: "#666666",
    fontSize: "10px",
  },
};
