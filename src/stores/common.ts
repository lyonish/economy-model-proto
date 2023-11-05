import { writable } from 'svelte/store'

export let initialized = writable(false);
export let month = writable(0);
