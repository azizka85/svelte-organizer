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

export const dateFormatter = new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
