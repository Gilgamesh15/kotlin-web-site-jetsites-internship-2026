import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/index/index.page.tsx"),
  route("*", "./routes/404.tsx"),
] satisfies RouteConfig;
