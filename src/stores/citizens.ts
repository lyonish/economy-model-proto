import { writable } from 'svelte/store'

export type Citizen = {
  name: string;
  income: number;
  spending: number;
  benefit: number;
  balance: number;
}

export const emptyCitizen = {
  name: '(not set)',
  income: 0,
  spending: 0,
  benefit:  0,
  balance:  0,
}

export let citizens = writable<Citizen[]>([emptyCitizen]);