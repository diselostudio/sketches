import "./style.scss";
import brand from "#root/brand/brand.svg?raw";
import { formatIDFromRoute } from "#root/utils/url";

export { Page };

function Page(routes: [{ preview: string, route: string }]) {

  const index = routes.map(route => `
    <div class="collection__item">
      <a class="collection__item-link" href="${route.route}">
        <p class="collection__item-title caption">${formatIDFromRoute(route.route)}</p>
        <img class="collection__item-image" src=".${route.preview}" />
      </a>
    </div>
  `).join('')

  return `
    <main class="intro">
      <div class="intro__brand">
        <a href="https://diselo.xyz" target="_blank">${brand}</a>
      </div>
      <div class="intro__bar"></div>
      <h1 class="intro__heading base-text">A COLLECTION OF RANDOM CODING VISUAL EXPERIENCES DRIVEN BY EXPLORATION</h1>
      <div class="intro__socials base-text">
        <p class="socials__title caption">Socials</p>
        <div class="socials__bucket">
          <a href="https://twitter.com/diseloxyz" target="_blank">
            <span>TWITTER</span>
          </a>
          <span>—</span>
          <span class="socials__discord">
            <span>DISCORD</span>
            <span>ASK ME</span>
          </span>
        </div>
        <div class="socials__bucket">
          <a href="mailto:hello@diselo.xyz" target="_blank">
            <span>EMAIL</span>
          </a>
          <span>—</span>
          <a href="www.linkedin.com/in/elías-pintos-aris-a5b6462b1" target="_blank">
            <span>LINKEDIN</span>
          </a>
          <span>—</span>
          <a href="https://github.com/diselostudio" target="_blank">
            <span>GITHUB</span>
          </a>
        </div>
      </div>
      <section class="collection">
        ${index}
      </section>
    </main>
  `;
}