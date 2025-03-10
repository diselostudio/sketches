import GlslCanvas from "glslCanvas";
import "#root/analytics.client";
import { done } from "#root/services/loader";
import shader from './shaders/shader_0.frag';

(function () {

    const grid = document.getElementById('grid')
    const el = document.createElement('canvas')
    el.style.width = '100%'
    const sandbox = new GlslCanvas(el)
    sandbox.on('load', () => {
        done()
    });
    sandbox.load(shader)
    grid.appendChild(el)

})();

