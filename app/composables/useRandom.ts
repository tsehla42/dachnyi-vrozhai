import { Random } from '~/utils';

export function useRandom() {
  const r = new Random(Date.now());

  const getRandomInteger = ({ min, max }: { min: number; max: number } = { min: 0, max: 15 }) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(r.nextNumber53() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  };

  return {
    getRandomInteger,
  };
}
