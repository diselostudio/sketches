export function getLastURLparam(route: string) {
    const parts = route.split('/');
    const segment = parts.pop() || parts.pop()
    return segment;
}

export function formatIDFromRoute(route: string) {
    const segment = getLastURLparam(route);
    return (segment as string).padStart(3, "0");
}