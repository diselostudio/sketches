import GlslCanvas from "glslCanvas";
import shader from "./shader.frag?raw";
import "#root/analytics.client";

(function () {
    const canvas = document.getElementById("experience");
    const sandbox = new GlslCanvas(canvas);
    canvas.style.width = `${window.innerWidth - 40}px`
    sandbox.load(shader);

    window.addEventListener('resize', function () {
        canvas.style.width = `${window.innerWidth - 40}px`
    })
})();

