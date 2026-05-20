<script setup lang="ts">
const items = [
  { id: 0, articleLabel: 'Капустяні', to: '/test', picturePath: '/images/ovochi/kapustiani/kapustiani.jpg' },
  { id: 1, articleLabel: 'Бобові', to: '/test', picturePath: '/images/ovochi/bobovi/bobovi.jpg' },
  { id: 2, articleLabel: 'Бульбоплоди', to: '/test', picturePath: '/images/ovochi/bulboplody/bulboplody.jpg' },
  { id: 3, articleLabel: 'Коренеплоди', to: '/test', picturePath: '/images/ovochi/koreneplody/koreneplody.jpg' },
  { id: 4, articleLabel: 'Пасльонові', to: '/test', picturePath: '/images/ovochi/paslionovi/paslionovi.jpg' },
  {
    id: 5,
    articleLabel: 'Пряно смакові рослини',
    to: '/test',
    picturePath: '/images/ovochi/priano-smakovi-roslyny/priano-smakovi-roslyny.jpg',
  },
  { id: 6, articleLabel: 'Розсада', to: '/test', picturePath: '/images/ovochi/vyroschuvannia-rozsady/vyroschuvannia-rozsady.jpg' },
  { id: 7, articleLabel: 'Салатні', to: '/test', picturePath: '/images/ovochi/salatni/salatni.jpg' },
  { id: 8, articleLabel: 'Цибулеві', to: '/test', picturePath: '/images/ovochi/tsybulevi/tsybulevi.jpg' },
  { id: 9, articleLabel: 'Гарбузові', to: '/test', picturePath: '/images/ovochi/harbuzovi/harbuzovi.jpg' },
  { id: 10, articleLabel: 'Ягідні', to: '/test', picturePath: '/images/ovochi/yahidni-roslyny/yahidni-roslyny.jpg' },
  { id: 11, articleLabel: 'template-200x200', to: '/test', picturePath: '/images/fallback/fallback-200x200.jpg' },
  { id: 12, articleLabel: 'fallback-200x200', to: '/test', picturePath: '/images/fallback/fallback-200x200.jpg' },
  { id: 13, articleLabel: 'Капустяні 14', to: '/test', picturePath: '/images/ovochi/kapustiani/kapusta-bilokachanna.jpg' },
  { id: 14, articleLabel: 'Капустяні 15', to: '/test', picturePath: '/images/ovochi/kapustiani/kapustiani.jpg' },
];

type CardRefValue<T = HTMLDivElement> = T | null;
const highlightedCardClass = ['rounded-sm', 'shadow-[0_0_40px_16px_rgba(255,222,54,1)]', 'z-[1]'];
const fullscreenCardClass = ['absolute', 'z-[5]', 'duration-1000'];
const background = ref<CardRefValue>(null);
const articleLabel = ref<CardRefValue<HTMLHeadingElement>>(null);
const cardsRefs = ref<Array<CardRefValue>>([]);

const functionRef = (el: CardRefValue, index: number) => {
  cardsRefs.value[index] = el;
};

const { getRandomInteger } = useRandom();
const randomArticleId = ref<number>(0);
const previousRandomArticleId = ref(0);

const getRandomArticle = () => {
  backgroundProperties.hideBackground();
  articleProperties.setPreviousRandomArticleId();
  articleProperties.setNewRandomArticleId();
  articleProperties.hideArticleName();

  if (!isAnimationInProgress.value) {
    resetAllToDefaultState();
    animateCards();
  }
};

const resetAnimationPlayCount = () => {
  animationPlayCount.value = 0;
};

const resetRandomArticleHighlighting = () => {
  const index = previousRandomArticleId.value;
  cardProperties.removeCardHighlighting(index);
};

const isAnimationInProgress = ref(false);
const animationPlayCount = ref(0);
const maxAnimationPlays = ref(getRandomInteger({ min: 1, max: 4 }));
const isLastAnimationPlay = computed(() => animationPlayCount.value === maxAnimationPlays.value);

const cardProperties = {
  updateCardClasses: (index: number, { add = [], remove = [] }: { add?: string[]; remove?: string[] } = {}) => {
    const card = cardsRefs.value[index];
    if (card) {
      add.forEach((className) => card.classList.add(className));
      remove.forEach((className) => card.classList.remove(className));
    }
  },

  highlightCard: (cardIndex: number) => {
    cardProperties.updateCardClasses(cardIndex, { add: highlightedCardClass });
  },
  removeCardHighlighting: (cardIndex: number) => {
    cardProperties.updateCardClasses(cardIndex, { remove: highlightedCardClass });
  },

  scaleSelectedCard: () => {
    cardProperties.updateCardClasses(randomArticleId.value, {
      add: ['scale-[200%]', 'border-none'],
      remove: ['overflow-hidden'],
    });
  },
  unscaleSelectedCard: () => {
    cardProperties.updateCardClasses(previousRandomArticleId.value, {
      add: ['overflow-hidden'],
      remove: ['scale-[200%]', 'border-none'],
    });
  },
  resetScaleSelectedCard: () => {
    cardProperties.updateCardClasses(randomArticleId.value, { remove: ['scale-[200%]'] });
  },

  setCardBlur: () => {
    cardProperties.updateCardClasses(randomArticleId.value, { add: ['blur-sm'] });
  },
  resetCardBlur: () => {
    cardProperties.updateCardClasses(previousRandomArticleId.value, { remove: ['blur-sm'] });
  },

  setSelectedCardFullscreen: () => {
    cardProperties.updateCardClasses(randomArticleId.value, { add: fullscreenCardClass });
  },
  unsetSelectedCardFullscreen: () => {
    cardProperties.updateCardClasses(previousRandomArticleId.value, { remove: fullscreenCardClass });
  },
};

const backgroundProperties = {
  hideBackground: () => {
    if (background.value) background.value.style.opacity = '0';
  },
  showBackground: () => {
    if (background.value) background.value.style.opacity = '';
  },
  darkenBackground: () => {
    if (background.value) {
      background.value.classList.add('z-[4]');
      background.value.classList.remove('group-hover:opacity-0');
      background.value.style.opacity = '1';
    }
  },
  resetDarkBackground: () => {
    if (background.value) {
      background.value.classList.remove('z-[4]');
      background.value.classList.add('group-hover:opacity-0');
      background.value.style.opacity = '';
    }
  },
};

const articleProperties = {
  setPreviousRandomArticleId: () => {
    previousRandomArticleId.value = randomArticleId.value;
  },
  setNewRandomArticleId: () => {
    randomArticleId.value = getRandomInteger();
  },
  hideArticleName: () => {
    articleLabel.value?.classList.add('opacity-0');
  },
  setRandomArticleName: () => {
    if (articleLabel.value) {
      articleLabel.value.classList.add('z-[6]');
      articleLabel.value.classList.remove('opacity-0');
      articleLabel.value.textContent = String(items[randomArticleId.value]!.articleLabel);
    }
  },
};

const animateCards = () => {
  isAnimationInProgress.value = true;
  const animationDuration = 120;
  const totalDuration = animationDuration * cardsRefs.value.length + 28;
  let currentIndex = 0;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  const stopAnimation = () => {
    clearInterval(interval);
    isAnimationInProgress.value = false;
  };

  cardProperties.highlightCard(currentIndex);
  const interval = setInterval(() => {
    if (currentIndex === randomArticleId.value && isLastAnimationPlay.value) {
      stopAnimation();
      clearTimeout(timeout);
      animateSelectedCard();
      return;
    }
    cardProperties.removeCardHighlighting(currentIndex);
    currentIndex += 1;

    if (currentIndex === cardsRefs.value.length) {
      stopAnimation();
    } else {
      cardProperties.highlightCard(currentIndex);
    }
  }, animationDuration);

  if (animationPlayCount.value < maxAnimationPlays.value) {
    animationPlayCount.value += 1;
    timeout = setTimeout(() => {
      animateCards();
    }, totalDuration);
  }
};

const animateSelectedCard = () => {
  setTimeout(() => backgroundProperties.showBackground(), 200);
  setTimeout(() => cardProperties.scaleSelectedCard(), 800);
  setTimeout(() => backgroundProperties.darkenBackground(), 1600);
  setTimeout(() => cardProperties.setCardBlur(), 2000);
  setTimeout(() => {
    cardProperties.setSelectedCardFullscreen();
    articleProperties.setRandomArticleName();
  }, 2200);
  setTimeout(() => cardProperties.resetScaleSelectedCard(), 2400);
};

const resetAllToDefaultState = () => {
  resetAnimationPlayCount();
  resetRandomArticleHighlighting();
  cardProperties.unscaleSelectedCard();
  cardProperties.unsetSelectedCardFullscreen();
  cardProperties.resetCardBlur();
  backgroundProperties.resetDarkBackground();
};
</script>

<template>
  <div
    class="group relative my-10 border-3 border-black rounded-2xl overflow-hidden cursor-pointer bg-black"
    @click="getRandomArticle"
  >
    <div
      ref="background"
      class="absolute bg-black opacity-30 group-hover:opacity-0 w-full h-full transition-opacity duration-500"
    />
    <h3
      ref="articleLabel"
      class="absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-max p-3 text-center text-5xl bg-gray-100/28 backdrop-blur-xs rounded-lg transition duration-1000"
    >
      Випадкова стаття {{ randomArticleId }}
    </h3>
    <article class="grid grid-cols-5">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :ref="(el) => functionRef(el as HTMLDivElement | null, index)"
        :class="{ [index]: true, [`id${item.id}`]: true }"
        class="image-container relative w-full h-32 border border-black overflow-hidden transition duration-200"
      >
        <NuxtImg
          :src="item.picturePath"
          class="absolute inset-0 w-full h-full object-cover"
          width="300"
          height="300"
          lazy
          @error="(args) => console.log(args)"
        />
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss"></style>
