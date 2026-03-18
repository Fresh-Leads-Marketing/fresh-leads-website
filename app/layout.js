import "./globals.css";

export const metadata = {
  title: "Fresh Leads Marketing | #1 Laundromat Marketing Agency",
  description: "We help laundromats across the U.S. grow with geo-fenced ads, AI chatbots, email & SMS marketing, commercial outreach, and more. 125+ laundromats served.",
  openGraph: {
    title: "Fresh Leads Marketing | Laundromat Marketing Agency",
    description: "We help laundromats across the U.S. grow with geo-fenced ads, AI chatbots, email & SMS marketing, commercial outreach, and more. 125+ laundromats served.",
    type: "website",
    url: "https://freshleadsmarketing.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
