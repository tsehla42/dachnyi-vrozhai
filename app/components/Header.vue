<script setup lang="ts">
import useSections from '~/composables/useSections';

const { contentSections } = useSections();
</script>

<template>
  <header class="hidden sm:block">
    <section class="header-top">
      <NuxtLink to="/" class="logo-wrapper">
        <SvgIconLogoDachniy class="header-logo-icon" width="250" />
        <SvgIconLogoVrozhai class="header-logo-icon" width="250" />
      </NuxtLink>

      <div class="header-text">
        <p>Вирощуй разом з нами на дачному врожаї!</p>
      </div>
    </section>

    <section class="progress-bar">
      <HeaderReadingProgressBar />
    </section>

    <section class="header-links">
      <HeaderSectionDropdown
        v-for="section in contentSections"
        :key="section.sectionName"
        :section="section"
      />
    </section>
  </header>
</template>

<style scoped lang="scss">
$header-height: 180px;
$progress-bar-height: 8px;

header {
  width: 100%;
  position: sticky;
  top: -$header-height;
  z-index: 10;

  .header-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: $header-height;
    padding: 0 24px;
    background: linear-gradient(290deg, $orange-400 20.28%, $secondary 52.52%);

    .logo-wrapper {
      display: flex;
      filter: drop-shadow(0 0 10px rgba($black, 0.5));

      .header-logo-icon {
        height: 180px;
      }
    }

    .header-text {
      @include flex-center();

      p {
        margin: 28px 0 0;
        font-family: $font-family-primary;
      }
    }
  }

  .progress-bar {
    border-bottom: 3px solid $green-800;
  }

  .header-links {
    width: 100%;
    position: sticky;
    top: 0;
    height: 52px;
    display: flex;
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .link {
    font-family: $font-family-secondary;
  }
}
</style>
