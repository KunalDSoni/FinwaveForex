import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/rates", "/about", "/contact", "/privacy", "/terms"];
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  return [...staticPaths, ...servicePaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/rates" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
