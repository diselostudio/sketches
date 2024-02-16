export function formatIDFromRoute(route: string) {
    const parts = route.split('/');
    const segment = parts.pop() || parts.pop()
    return (segment as string).padStart(3, "0");
}