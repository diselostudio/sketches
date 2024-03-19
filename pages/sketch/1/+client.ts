import "#root/analytics.client";
import * as THREE from 'three-162';
import { done } from "#root/services/loader";
import { onResize } from "#root/services/resize";
import { clamp } from "#root/utils/utils";
import {
    createScene,
    createSketch,
    createWebGLRenderer,
    createOrtographicCamera,
    createRendererAnimation,
    createClock,
} from "#root/three-scene/v1/scene";
import fragment from './shaders/fragment.frag';

const vertex = import.meta.glob('./shaders/*.vert', {
    eager: true,
    import: 'default'
})

interface State {
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.OrthographicCamera
    clock: THREE.Clock,
    animate: (fn: () => void) => () => {}
}

(function () {

    createSketch(
        createScene,
        createWebGLRenderer({
            webGL: {
                canvas: document.getElementById("experience"),
                antialias: true,
                alpha: true,
            }
        }),
        createOrtographicCamera({
            d: 200,
            near: -220,
            far: 220,
        }),
        createRendererAnimation(),
        function (state: State) {
            onResize(function () {
                state.renderer.setSize(window.innerWidth, window.innerHeight);
                state.camera.updateProjectionMatrix();
            });
            return state;
        },
        createClock(),
        function ({ renderer, scene, camera, animate, clock }: State) {

            const planew = 30;
            const planeh = 25;
            const padding = 1.9;
            const totalw = planew * 4 * padding;
            const totalh = planeh * 4 * padding;

            const geometry = new THREE.BoxGeometry(planew, planeh, 1, 75, 75)

            const planes: THREE.Mesh<THREE.BoxGeometry, THREE.ShaderMaterial>[] = new Array(16).fill(null).map((_, index) => {

                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        uTime: { value: clock.getElapsedTime() }
                    },
                    vertexShader: Object.values(vertex as object)[index],
                    fragmentShader: fragment,
                });

                animate(function () {
                    material.uniforms.uTime.value = clock.getElapsedTime();
                });

                const mesh = new THREE.Mesh(
                    geometry,
                    material
                )

                const rowIsEven = Math.floor(index / 4) % 2 === 1;
                const decalaxe = rowIsEven ? (planew / 2) * padding : 0;

                const x = (index * planew) % (planew * 4);
                const z = Math.floor(index / 4) * planeh;
                mesh.position.set(x * padding + decalaxe, 0, z * padding);
                mesh.rotateX(Math.PI * 0.5);
                return mesh;
            });

            const planesgroup = new THREE.Group().add(...planes);

            const groups: THREE.Group[] = new Array(8).fill(null).map((_, index) => {
                const g = planesgroup.clone(true);
                index = index + 1;
                g.position.x = (totalw * index) % (totalw * 3);
                g.position.z = Math.floor(index / 3) * totalh;
                return g
            })

            const bBoxReference = new THREE.Box3().setFromObject(planesgroup);
            const bBoxScene = new THREE.Box3().setFromObject(groups[3]);
            const center = new THREE.Vector3();
            bBoxScene.getCenter(center);
            camera.position.copy(center);

            scene.add(planesgroup, ...groups);

            function updateFrustrum() {
                const aspect = window.innerWidth / window.innerHeight;
                const proportional = (clamp(aspect, 0.55, 2.7) - 0.55) / (2.7 - 0.55);
                let factor = 0.88 + proportional * (0.5 - 0.88);

                // edge length
                const l = bBoxReference.max.x;
                // diagonal length
                const d = Math.sqrt((l * l) * 2);


                camera.left = (-d / 2 * factor) * aspect;
                camera.right = (d / 2 * factor) * aspect;
                camera.top = (d / 2 * factor);
                camera.bottom = -(d / 2 * factor);

                camera.updateProjectionMatrix();
                camera.updateMatrix();
            }

            updateFrustrum();
            onResize(updateFrustrum);

            done();
        }
    )
})();

