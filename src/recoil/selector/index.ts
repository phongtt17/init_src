import { selector } from 'recoil';
import { countState } from '../atom';

export const incrementCount = selector({
  key: 'incrementCount',
  set: ({ set }) => set(countState, (currCount) => currCount + 1),
  get: ({ get }) => get(countState)
})