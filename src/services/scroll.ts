import { throttle } from '#root/utils/utils';

type EventFn = (...args: any[]) => void
type EventsList = Array<EventFn>;
type EventsStoreKey = 'events' | 'eventsOnce' | 'start' | 'startOnce' | 'end' | 'endOnce' | 'direction' | 'directionOnce';
type UnsubscribeFn = () => void;
type ScrollDirection = 'UP' | 'DOWN';

const stores = new Map<EventsStoreKey, EventsList>()
    .set('events', [])
    .set('eventsOnce', [])
    .set('start', [])
    .set('startOnce', [])
    .set('end', [])
    .set('endOnce', [])
    .set('direction', [])
    .set('directionOnce', []);

let withStart: boolean = true;
let direction: ScrollDirection = 'DOWN';
let lastScrollPosition: number = window.scrollY;

function scrollEventsExecuter(e: Event) {

    const newDirection: ScrollDirection = lastScrollPosition - window.scrollY > 0 ? 'UP' : 'DOWN';

    stores.get('events')?.forEach(event => event.apply(null, [e, newDirection]));
    stores.get('eventsOnce')?.forEach(event => event.apply(null, [e, newDirection]));
    stores.set('eventsOnce', []);

    if (withStart) {
        stores.get('start')?.forEach(event => event.apply(null, [e, newDirection]));
        stores.get('startOnce')?.forEach(event => event.apply(null, [e, newDirection]));
        stores.set('startOnce', []);
        withStart = false;
    }

    if (newDirection !== direction) {
        stores.get('direction')?.forEach(event => event.apply(null, [e, newDirection]));
        stores.get('directionOnce')?.forEach(event => event.apply(null, [e, newDirection]));
        stores.set('directionOnce', []);
    }
    direction = newDirection;
    lastScrollPosition = window.scrollY;
}

function scrollEndEventsExecuter(e: Event) {
    stores.get('end')?.forEach(event => event.apply(null, [e, direction]));
    stores.get('endOnce')?.forEach(event => event.apply(null, [e, direction]));
    stores.set('endOnce', []);
    withStart = true;
}

function observe(fn: EventFn, store: EventsStoreKey): UnsubscribeFn {
    const box = stores.get(store) as EventsList;
    box.push(fn);
    return () => stores.set(store, box.filter(eventFn => eventFn !== fn));
}

export const onScroll = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'events');

export const onScrollOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'eventsOnce');

export const onScrollStart = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'start');

export const onScrollStartOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'startOnce');

export const onScrollEnd = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'end');

export const onScrollEndOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'endOnce');

export const onScrollDirectionChange = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'direction');

export const onScrollDirectionChangeOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'directionOnce');

(function () {
    document.addEventListener('scroll', throttle(scrollEventsExecuter, 45));
    document.addEventListener('scrollend', scrollEndEventsExecuter);
})();


