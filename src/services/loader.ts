const loader = document.getElementById('loader') as HTMLElement;

export function done(callback = () => { }): void {

    if (!loader) {
        throw new Error('Loader HTMLElement not found in DOM')
    }

    document.body.classList.add('is-loading_remove');
    setTimeout(() => {
        document.body.classList.remove('is-loading_remove');
        document.body.classList.remove('is-loading');
        callback();
        loader.remove();
    }, 200)
}