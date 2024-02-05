// Environment: config

/**
 * @see {@link https://vike.dev/render-modes#html-only}
 */
export default {
    meta: {
        title: {
            env: { server: true, client: true }
        },
        description: {
            env: { server: true }
        },
        // rand: {
        //     env: { server: true }
        // }
    },
};
