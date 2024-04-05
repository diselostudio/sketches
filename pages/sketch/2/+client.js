import GlslCanvas from "glslCanvas";
import shader from "./shader.frag?raw";
import "#root/analytics.client";
import { onResize } from "#root/services/resize";
import { done } from "#root/services/loader";

(function () {
    const canvas = document.getElementById("experience");
    const sandbox = new GlslCanvas(canvas);
    canvas.style.width = `${window.innerWidth}px`;
    sandbox.on('load', done);
    sandbox.load(shader);

    onResize(function () {
        canvas.style.width = `${window.innerWidth}px`;
    });

})();

