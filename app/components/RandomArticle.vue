<script setup lang="ts">
interface RandomArticleItem {
  id: number;
  articleLabel: string;
  to: string;
  picturePath: string;
}

const { getRandomInteger } = useRandom();
const { allArticles } = useContentArticles();

const buildRandomItems = (): RandomArticleItem[] => {
  const mapped = allArticles.map((article) => ({
    articleLabel: article.label,
    to: article.to,
    picturePath: `/images/${article.sectionName}/${article.categoryName}/${article.categoryName}.jpg`,
  }));

  // Fisher-Yates shuffle
  const shuffled = [...mapped];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInteger({ min: 0, max: i + 1 });
    [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
  }

  return shuffled.slice(0, 15).map((item, index) => ({ id: index, ...item }));
};

const items = buildRandomItems();

const handleImageError = (e: string | Event) => {
  if (e instanceof Event && e.target instanceof HTMLImageElement) {
    e.target.srcset = '';
    e.target.src = '/images/fallback/fallback-200x200.jpg';
  }
};

type CardRefValue<T = HTMLDivElement> = T | null;
const highlightedCardClass = ['rounded-sm', 'shadow-[0_0_40px_16px_rgba(255,222,54,1)]', 'z-[1]'];
const background = ref<CardRefValue>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const articleLabel = ref<CardRefValue<HTMLHeadingElement>>(null);
const cardsRefs = ref<Array<CardRefValue>>([]);

const functionRef = (el: CardRefValue, index: number) => {
  cardsRefs.value[index] = el;
};

const randomArticleId = ref<number>(0);
const selectedLabel = ref<string | null>(null);
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
  for (let i = 0; i < cardsRefs.value.length; i++) {
    cardProperties.removeCardHighlighting(i);
  }
};

const isAnimationInProgress = ref(false);
const animationTimeouts = ref<ReturnType<typeof setTimeout>[]>([]);
const animationIntervals = ref<ReturnType<typeof setInterval>[]>([]);

const clearAnimationTimeouts = () => {
  animationTimeouts.value.forEach(clearTimeout);
  animationTimeouts.value = [];
  animationIntervals.value.forEach(clearInterval);
  animationIntervals.value = [];
};

onUnmounted(() => {
  clearAnimationTimeouts();
});

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
      add: ['scale-[120%]', 'border-none'],
      remove: ['overflow-hidden'],
    });
  },
  unscaleSelectedCard: () => {
    cardProperties.updateCardClasses(previousRandomArticleId.value, {
      add: ['overflow-hidden'],
      remove: ['scale-[120%]', 'border-none'],
    });
  },
  resetCardBlur: () => {
    cardProperties.updateCardClasses(previousRandomArticleId.value, { remove: ['blur-sm'] });
  },

  expandCardToFullscreen: () => {
    const card = cardsRefs.value[randomArticleId.value];
    const container = containerRef.value;
    if (!card || !container) return;

    // Read visual rect while scale-[120%] is applied
    const cardRect = card.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const top = cardRect.top - containerRect.top;
    const left = cardRect.left - containerRect.left;
    const width = cardRect.width;
    const height = cardRect.height;

    // Remove scale transform, restore overflow, place absolutely at same visual position
    card.classList.remove('scale-[120%]', 'border-none');
    card.classList.add('overflow-hidden');
    card.style.position = 'absolute';
    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
    card.style.width = `${width}px`;
    card.style.height = `${height}px`;
    card.style.zIndex = '5';
    card.style.transition = 'none';

    // Force reflow to commit current position
    void card.getBoundingClientRect();

    // Animate to fullscreen
    card.style.transition = 'top 0.6s ease, left 0.6s ease, width 0.6s ease, height 0.6s ease';
    card.style.top = '0';
    card.style.left = '0';
    card.style.width = '100%';
    card.style.height = '100%';
  },

  clearCardInlineStyles: (index: number) => {
    const card = cardsRefs.value[index];
    if (!card) return;
    card.style.position = '';
    card.style.top = '';
    card.style.left = '';
    card.style.width = '';
    card.style.height = '';
    card.style.zIndex = '';
    card.style.transition = '';
  },
};

const backgroundProperties = {
  hideBackground: () => {
    if (background.value) background.value.style.opacity = '0';
  },
  showBackground: () => {
    if (background.value) background.value.style.opacity = '';
  },
  resetDarkBackground: () => {
    if (background.value) {
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
    randomArticleId.value = getRandomInteger({ min: 0, max: items.length });
  },
  hideArticleName: () => {
    articleLabel.value?.classList.add('opacity-0');
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

  animationIntervals.value.push(interval);

  if (animationPlayCount.value < maxAnimationPlays.value) {
    animationPlayCount.value += 1;
    timeout = setTimeout(() => {
      animateCards();
    }, totalDuration);
    animationTimeouts.value.push(timeout);
  }
};

const animateSelectedCard = () => {
  isAnimationInProgress.value = true;
  const targetId = randomArticleId.value;
  const targetItem = items[targetId]!;
  const t1 = setTimeout(() => backgroundProperties.showBackground(), 200);
  const t2 = setTimeout(() => cardProperties.scaleSelectedCard(), 800);
  const t3 = setTimeout(() => cardProperties.expandCardToFullscreen(), 1600);
  const t4 = setTimeout(() => {
    if (articleLabel.value) {
      articleLabel.value.classList.add('z-[6]');
      articleLabel.value.classList.remove('opacity-0');
    }
    selectedLabel.value = targetItem.articleLabel;
  }, 2400);
  const t5 = setTimeout(() => {
    isAnimationInProgress.value = false;
    navigateTo(targetItem.to);
  }, 3400);
  animationTimeouts.value.push(t1, t2, t3, t4, t5);
};

const resetAllToDefaultState = () => {
  clearAnimationTimeouts();
  resetAnimationPlayCount();
  resetRandomArticleHighlighting();
  cardProperties.unscaleSelectedCard();
  cardProperties.clearCardInlineStyles(previousRandomArticleId.value);
  backgroundProperties.resetDarkBackground();
  selectedLabel.value = null;
};
</script>

<template>
  <div
    ref="containerRef"
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
      {{ selectedLabel ?? 'Випадкова стаття ' + randomArticleId }}
    </h3>
    <article class="grid grid-cols-5">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :ref="(el) => functionRef(el as HTMLDivElement | null, index)"
        class="image-container relative w-full h-32 border border-black overflow-hidden transition duration-200"
      >
        <NuxtImg
          :src="item.picturePath"
          class="absolute inset-0 w-full h-full object-cover"
          width="300"
          height="300"
          lazy
          @error="handleImageError"
        />
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss"></style>
