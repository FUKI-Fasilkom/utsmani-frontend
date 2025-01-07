import { Paginated } from './interface'

// create default value for Paginated<T> interface
export const defaultPaginated = <T>(): Paginated<T> => ({
  count: 0,
  next: null,
  previous: null,
  results: [],
})
