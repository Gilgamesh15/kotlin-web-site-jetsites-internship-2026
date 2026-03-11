import type { MetaDescriptor } from "react-router";

export function getMeta(
  args: {
    title?: string;
    url?: string;
    image?: string;
    description?: string;
    ogImage?: string;
  },
  rest: MetaDescriptor[] = [],
): MetaDescriptor[] {
  const { title, url, image, description, ogImage } = args;

  const fullTitle = `${title ? `${title} - ` : ""}Kotlin Programming Language`;
  return [
    {
      title: fullTitle,
    },
    {
      property: "og:title",
      content: fullTitle,
    },
    {
      property: "og:url",
      content: `https://kotlinlang.org${url}`,
    },
    {
      property: "og:image",
      content: `https://kotlinlang.org${ogImage || "/images/open-graph/general.png"}`,
    },
    ...(description !== undefined
      ? [{ property: "og:description", content: description }]
      : []),
    {
      name: "twitter:title",
      content: fullTitle,
    },
    ...(description !== undefined
      ? [{ name: "twitter:description", content: description }]
      : []),
    {
      name: "twitter:image:src",
      content: `https://kotlinlang.org${image || "/images/twitter/general.png"}`,
    },
    ...rest,
  ];
}
