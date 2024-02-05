import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

export { onRenderHtml };

/**
 * The onRenderHtml() hook defines how pages are rendered to HTML.
 * @see {@link https://vike.dev/onRenderHtml}
 */
const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {

  const { Page } = pageContext;

  const pageHtml = (Page as () => string)();

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title> SSSSSKKK</title>
      </head>
      <body>
        <div id="page-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {}
  };
};
