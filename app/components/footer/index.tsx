import React from "react";
import { ThemeProvider } from "@rescui/ui-contexts";
import "@jetbrains/kotlin-web-site-ui/dist/footer.css";
import { useIsClient } from "~/hooks/use-is-client";

export interface GlobalFooterProps extends Record<string, unknown> {}

const LazyGlobalFooter = React.lazy(
  // @ts-expect-error
  () => import("@jetbrains/kotlin-web-site-ui/dist/footer.js"),
) as unknown as React.ComponentType<GlobalFooterProps>;

const Footer = ({ ...props }: GlobalFooterProps) => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider theme="dark">
        <LazyGlobalFooter {...props} />
      </ThemeProvider>
    </React.Suspense>
  );
};

export default Footer;
