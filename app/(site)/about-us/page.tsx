import { constructMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata = constructMetadata({
  title: 'About Us',
  path: '/about-us',
  description: 'How KhasCom grew from connecting Pakistani farmers with regional buyers into a full-service commodities export house serving international wholesale markets.',
});

export default function AboutPage() {
  return <AboutClient />;
}
