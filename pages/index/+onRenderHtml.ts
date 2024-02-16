import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

export { onRenderHtml };

const images = import.meta.glob('./../**/**.png', { eager: true, as: 'url', import: 'default' })

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {

  const { Page, favicon } = pageContext.config as any;

  const routes = pageContext._pageRoutes
    .map(route => route.routeString)
    .filter(route => route.includes('sketch'))
    .map(route => {
      const imagekey = Object.keys(images).find((image) => image.includes(route)) as string
      return { route, preview: images[imagekey] };
    })

  const pageHtml = (Page as (pages: any) => string)(routes);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>sketch index - diselo.xyz</title>
        ${dangerouslySkipEscape(favicon)}
        <meta name="description" content="a collection of random creative coding visual sketches for the sake of exploring at diselo.xyz">
        <meta name="keywords" content="Collection, Random, Creative coding, Visual sketches, Exploration, Diselo.xyz">
        <meta name="image" content="./og.png">
        <meta property="og:title" content="sketch index - diselo.xyz">
        <meta property="og:image" content="https://sketchindex.diselo.xyz/og.png">
        <meta property="og:url" content="https://sketchindex.diselo.xyz">
        <meta property="og:type" content="website" />
        <meta property="og:description" content="a collection of random creative coding visual sketches for the sake of exploring at diselo.xyz">
        <meta property="og:image:secure_url" content="https://sketchindex.diselo.xyz/og.png">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:alt" content="sketch index - diselo.xyz">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="en_GB">
        <meta property="og:site_name" content="sketchindex.diselo.xyz">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@diseloxyz">
        <meta name="twitter:creator" content="@diseloxyz">
        <meta name="twitter:title" content="sketch index - diselo.xyz">
        <meta name="twitter:description" content="a collection of random creative coding visual sketches for the sake of exploring at diselo.xyz">
        <meta name="twitter:image" content="https://sketchindex.diselo.xyz/og.png">
        <meta name="twitter:image:alt" content="sketch index - diselo.xyz">
      </head>
      <body>
        ${dangerouslySkipEscape(pageHtml)}
      </body>
    </html>`;

  return {
    documentHtml,
  };
};
