import { constructMetadata } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata = constructMetadata({
  title: 'About Us | KhasCom',
  description: 'Learn about our journey, mission, and how we became a trusted global exporter of premium organic agricultural products.',
});

export default function AboutPage() {
  return <AboutClient />;
}
