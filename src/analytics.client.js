function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

(function () {

    if (import.meta.env.DEV) return;

    const data = {
        date: formatDate(new Date()),
        sketch: window.location.pathname,
        location: Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ?? 'Int location not supported',
        origin: window.location.origin,
        experience: window.innerWidth < 1024 ? 'mobile' : 'desktop',
    };

    fetch(
        'https://api.tinybird.co/v0/events?name=sketch_events',
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { Authorization: `Bearer ${import.meta.env.VITE_TINYBIRD}` }
        }
    )

})();

