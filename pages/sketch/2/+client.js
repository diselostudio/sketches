import GlslCanvas from "glslCanvas";
import "#root/analytics.client";
import { onResize } from "#root/services/resize";
import { done } from "#root/services/loader";

(function () {

    const frags = import.meta.glob('./shaders/*.frag', {
        query: '?raw',
        eager: true,
        import: 'default'
    })

    const shaders = Object.values(frags)
    const grid = document.getElementById('grid')
    let toLoad = shaders.length

    for (let shader of shaders) {
        const el = document.createElement('canvas')
        
        const sandbox = new GlslCanvas(el)
        sandbox.on('load', () => {
            toLoad--
            if (toLoad === 0) {
                done()
            }
        });
        sandbox.load(shader)
        
        grid.appendChild(el)
    }

})();

