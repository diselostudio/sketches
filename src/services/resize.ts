import { throttle, debounce } from '#root/utils/utils';

type EventFn = (...args: any[]) => void
type EventsList = Array<EventFn>;
type EventsStoreKey = 'resize' | 'end' | 'start' | 'resizeOnce' | 'endOnce' | 'startOnce';
type UnsubscribeFn = () => void;

const stores = new Map<EventsStoreKey, EventsList>()
    .set('resize', [])
    .set('resizeOnce', [])
    .set('start', [])
    .set('startOnce', [])
    .set('end', [])
    .set('endOnce', [])

let withStart: boolean = true;

function eventsExecuter(e: Event) {

    stores.get('resize')?.forEach(event => event.apply(null, [e]));
    stores.get('resizeOnce')?.forEach(event => event.apply(null, [e]));
    stores.set('resizeOnce', []);

    if (withStart) {
        stores.get('start')?.forEach(event => event.apply(null, [e]));
        stores.get('startOnce')?.forEach(event => event.apply(null, [e]));
        stores.set('startOnce', []);
        withStart = false;
    }

    endEventExecuter(e);
}

const endEventExecuter = debounce(function (e: EventFn) {
    stores.get('end')?.forEach(event => event.apply(null, [e]));
    stores.get('endOnce')?.forEach(event => event.apply(null, [e]));
    stores.set('endOnce', []);
    withStart = true
}, 222);

function observe(fn: EventFn, store: EventsStoreKey): UnsubscribeFn {
    const box = stores.get(store) as EventsList;
    box.push(fn);
    return function () { stores.set(store, box.filter(eventFn => eventFn !== fn)) };
}

export const onResize = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'resize');

export const onResizeOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'resizeOnce');

export const onResizeEnd = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'end');

export const onResizeEndOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'endOnce');

export const onResizeStart = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'start');

export const onResizeStartOnce = (fn: EventFn): UnsubscribeFn => observe.call(null, fn, 'startOnce');

(function () {
    window.addEventListener('resize', debounce(eventsExecuter, 15));
})();