import "./style.scss";

export { Page };

function Page() {
  return `
    <canvas id="experience" class="experience"></canvas>
    <div class="content base-text">
      sketch 000, result of a shader workshop with <a href="https://twitter.com/iamelizasj" target="_blank">@iamelizasj</a> at <a href="https://twitter.com/noschoolnevers">@NØschool</a> Nevers, France 2023
    </div>
  `;
}
