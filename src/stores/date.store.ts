import { writable } from 'svelte/store'

export const date = writable(new Date());

export const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric'
});

export const dayFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'short',
  day: '2-digit'
});
