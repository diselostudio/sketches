export { Page };

/**
 * An empty page
 * @see {@link https://vike.dev/render-modes#html-only}
 */
function Page(routes: [{ preview: string, route: string }]) {

  const index = routes.map(route => `
    <pre>${route.route}</pre>
    <a href="${route.route}">${route.route}</a>
    <img src=".${route.preview}" />
  `).join('')

  return `
    <div>
      ${index}
    </div>
  `;
}
