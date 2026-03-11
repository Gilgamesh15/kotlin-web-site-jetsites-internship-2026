/**
 * Adapted from usehooks-ts.
 * @see https://usehooks-ts.com/react-hook/use-is-client
 * @license MIT
 */
import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
}
