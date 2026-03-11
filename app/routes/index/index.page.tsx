import { getMeta } from "../../lib/utils";
import "./index.scss";
import "../../styles/grid.scss";
import { HeaderSection } from "./header-section";
import { LatestFromKotlinSection } from "./latest-from-kotlin-section";
import { WhyKotlinSection } from "./why-kotlin-section";
import { UsageSection } from "./usage-section";
import { StartSection } from "./start-section";

import "@rescui/typography/lib/font-jb-sans-auto.css";

import hljs from "highlight.js/lib/core";
import kotlin from "highlight.js/lib/languages/kotlin";
import "highlight.js/styles/github.css";
import { ThemeProvider } from "@rescui/ui-contexts";
hljs.registerLanguage("kotlin", kotlin);

export const handle = { htmlClass: "page__index-new" };

export const links = () => [
  {
    rel: "preload",
    href: "/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2",
    as: "font",
  },
  {
    rel: "preload",
    href: "/fonts/JetBrainsMono/JetBrainsMono-Bold.woff2",
    as: "font",
  },
  {
    rel: "preload",
    href: "/fonts/JetBrainsMono/JetBrainsMono-Italic.woff2",
    as: "font",
  },
];

export const meta = () =>
  getMeta({
    url: "/",
  });

export default function HomePage() {
  return (
    <ThemeProvider theme="dark">
      <div className="overview-page">
        <HeaderSection />
        <LatestFromKotlinSection />
        <WhyKotlinSection />
        <UsageSection />
        <StartSection />
      </div>
    </ThemeProvider>
  );
}
