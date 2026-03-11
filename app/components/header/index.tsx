import React from "react";
import { ThemeProvider } from "@rescui/ui-contexts";
import "@jetbrains/kotlin-web-site-ui/dist/header.css";
import { useIsClient } from "~/hooks/use-is-client";

export interface GlobalHeaderProps extends Record<string, unknown> {
  productWebUrl?: string;
  hasSearch?: boolean;
  dropdownTheme?: string;
  currentUrl?: string;
}

const LazyGlobalHeader = React.lazy(
  () =>
    // @ts-ignore
    import("@jetbrains/kotlin-web-site-ui/dist/header.js"),
) as unknown as React.ComponentType<GlobalHeaderProps>;

const Header = ({
  productWebUrl,
  hasSearch = false,
  dropdownTheme = "light",
  currentUrl,
  ...props
}: GlobalHeaderProps) => {
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <React.Suspense fallback={null}>
      <ThemeProvider theme="dark">
        <LazyGlobalHeader
          productWebUrl={productWebUrl}
          hasSearch={hasSearch}
          dropdownTheme={dropdownTheme}
          currentUrl={currentUrl}
          {...props}
        />
      </ThemeProvider>
    </React.Suspense>
  );
};

export default Header;
