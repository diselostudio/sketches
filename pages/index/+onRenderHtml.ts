import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

export { onRenderHtml };

const images = import.meta.glob('./../**/**.png', { eager: true, as: 'url', import: 'default' })

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {

  const { Page } = pageContext;

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
      </head>
      <body>
        ${dangerouslySkipEscape(pageHtml)}
      </body>
    </html>`;

  return {
    documentHtml,
  };
};
