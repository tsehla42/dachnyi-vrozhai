import ovochi from '~/constants/content/ovochi.json';
import kvity from '~/constants/content/kvity.json';
import dobryva from '~/constants/content/dobryva.json';
import inventar from '~/constants/content/inventar.json';
import shkidnyky from '~/constants/content/shkidnyky-i-khvoroby.json';

const _allArticles = [ovochi, kvity, dobryva, inventar, shkidnyky].flatMap((section) =>
  section.flatMap((category) => category.articles),
);

export const useContentArticles = () => {
  const { getRandomInteger } = useRandom();

  const getRandomArticlePath = (): string => {
    const index = getRandomInteger({ min: 0, max: _allArticles.length });
    return _allArticles[index]!.to;
  };

  return { allArticles: _allArticles, getRandomArticlePath };
};
