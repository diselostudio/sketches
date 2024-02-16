import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { formatIDFromRoute, getLastURLparam } from "#root/utils/url";

const images = import.meta.glob('./../**/**.png', { eager: true, as: 'url', import: 'default' })

export { onRenderHtml };

/**
 * The onRenderHtml() hook defines how pages are rendered to HTML.
 * @see {@link https://vike.dev/onRenderHtml}
 */
const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {

  const { Page, config: { title, favicon, description } } = pageContext as any;

  const index = getLastURLparam(pageContext.urlOriginal);

  const formatindex = formatIDFromRoute(pageContext.urlOriginal);

  const titleString = title(formatindex);

  const pageHtml = (Page as () => string)();

  // NO VALE, TENGO QUE USAR EL KEY
  const ogImageKey = Object.keys(images).find(image => image.includes(`/${index}/`)) as string
  const ogImage = images[ogImageKey]

  console.log(ogImage)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        ${dangerouslySkipEscape(favicon)}
        <title>${titleString}</title>
        <meta name="description" content="${dangerouslySkipEscape(description)}">
        <meta name="keywords" content="Collection, Random, Creative coding, Visual sketches, Exploration, Diselo.xyz, Shaders, Three.JS, CSS">
        <meta name="image" content="https://sketchindex.diselo.xyz/${ogImage}">
        <meta property="og:title" content="${titleString}">
        <meta property="og:image" content="https://sketchindex.diselo.xyz/${ogImage}">
        <meta property="og:url" content="https://sketchindex.diselo.xyz/${pageContext.urlOriginal}">
        <meta property="og:type" content="website" />
        <meta property="og:description" content="${dangerouslySkipEscape(description)}">
        <meta property="og:image:secure_url" content="https://sketchindex.diselo.xyz/${ogImage}">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:alt" content="${titleString}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="en_GB">
        <meta property="og:site_name" content="sketchindex.diselo.xyz">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:site" content="@diseloxyz">
        <meta name="twitter:creator" content="@diseloxyz">
        <meta name="twitter:title" content="${titleString}">
        <meta name="twitter:description" content="${dangerouslySkipEscape(description)}">
        <meta name="twitter:image" content="https://sketchindex.diselo.xyz/${ogImage}">
        <meta name="twitter:image:alt" content="${titleString}">
      </head>
      <body>
        <main>
          ${dangerouslySkipEscape(pageHtml)}
        </main>
        <img src="${ogImage}">
        ${ogImage}
        ${JSON.stringify(images)}
        <section>${index}</section>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {}
  };
};

// GITHUB LINK TO SKECTCH
// INDEX LINK
// DISELO LINK
