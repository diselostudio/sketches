import * as THREE from 'three-162';
import { Timer } from 'three-162/addons/misc/Timer.js';
import { pipe } from "#root/utils/utils";

export function createSketch(...fns) {
    return pipe.apply(null, fns)({});
}

export function createScene(state) {
    state.scene = new THREE.Scene();
    return state;
}

export function createWebGLRenderer(params = {}) {

    const {
        webGL = {
            antialias: true,
        },
        width = window.innerWidth,
        height = window.innerHeight,
        pixelRatio = window.devicePixelRatio / 2
    } = params;

    return function (state) {
        const renderer = new THREE.WebGLRenderer(webGL)
        renderer.setSize(width, height)
        renderer.setPixelRatio(pixelRatio)
        state.renderer = renderer;
        return state;
    }
}

export function createPerspectiveCamera(params = {}) {

    const {
        fov = 45,
        aspect = window.innerWidth / window.innerHeight,
        near = 0.1,
        far = 2000
    } = params;

    return function (state) {

        const camera = new THREE.PerspectiveCamera(
            fov,
            aspect,
            near,
            far
        );
        state.camera = camera;
        return state;
    }
}

export function createOrtographicCamera(params = {}) {

    const {
        d = 20,
        aspect = window.innerWidth / window.innerHeight,
        near = 1,
        far = 1000,
        left = - d * aspect,
        right = d * aspect,
        top = d,
        bottom = -d
    } = params;

    return function (state) {

        const camera = new THREE.OrthographicCamera(
            left,
            right,
            top,
            bottom,
            near,
            far
        );
        camera.position.set(20, 20, 20);
        camera.lookAt(state.scene.position);

        state.camera = camera;
        return state;
    }
}

export function createRendererAnimation(params = {}) {

    const { fps } = params;

    return function (state) {
        let loop = [];

        function run() {
            loop.forEach(fn => fn())
            state.renderer.render(state.scene, state.camera);
        }

        state.animate = function (fn) {
            loop.push(fn);
            return () => loop = loop.filter(func => func !== fn)
        }

        state.renderer.setAnimationLoop(run);
        return state
    }
}

export function createTimer() {
    return function (state) {
        state.timer = new Timer();
        return state;
    }
}

export function createClock(params = {}) {
    return function (state) {
        state.clock = new THREE.Clock();
        return state;
    }
}