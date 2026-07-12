import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PowerPulse",
    short_name: "PowerPulse",
    description: "Community-powered electricity outage tracking for Ghana",
    start_url: "/",
    display: "standalone",
    background_color: "#160F08",
    theme_color: "#FBBF24",
    icons: [
      { src: "/icon192", sizes: "192x192", type: "image/png" },
      { src: "/icon512", sizes: "512x512", type: "image/png" },
    ],
  };
}