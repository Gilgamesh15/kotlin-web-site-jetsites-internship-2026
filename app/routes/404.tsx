import { Link } from "react-router";
import { getMeta } from "~/lib/utils";

export const meta = () => getMeta({ title: "Page Not Found" });

export default function NotFound() {
  return (
    <div style={{ padding: "48px 24px", textAlign: "center" }}>
      <h1>404 — Page Not Found</h1>
      <p>
        <Link to="/">Return to the Kotlin home page</Link>
      </p>
    </div>
  );
}
