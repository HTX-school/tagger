import { writable } from 'svelte/store';

let socket = writable(0);

export { socket }