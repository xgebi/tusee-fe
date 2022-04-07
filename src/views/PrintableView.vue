<template>
  <main class="page page-printable">
    <MainNavigation></MainNavigation>
    <section class="configuration">
      <h1>Printable</h1>
      <h2>Configuration</h2>
      <div>
        <label for="pageFormatSelector">Page format</label>
        <select id="pageFormatSelector" v-model="pageConfiguration.format">
          <option
            v-for="format in Object.keys(PAGE_FORMATS)"
            :value="PAGE_FORMATS[format]"
            :key="PAGE_FORMATS[format]"
          >
            {{ format }}
          </option>
        </select>
      </div>
      <div>
        <input
          type="radio"
          id="portrait"
          name="orientation"
          :value="ORIENTATION_PORTRAIT"
          v-model="pageConfiguration.orientation"
        />
        <label for="portrait">Portrait</label>

        <input
          type="radio"
          id="landscape"
          name="orientation"
          :value="ORIENTATION_LANDSCAPE"
          v-model="pageConfiguration.orientation"
        />
        <label for="landscape">Landscape</label>
      </div>
    </section>
    <svg :class="svgClass"></svg>
  </main>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/shared/MainNavigation.vue';
import {
  ORIENTATION_PORTRAIT,
  PAGE_FORMATS,
  ORIENTATION_LANDSCAPE,
} from '@/const/printables';
import { reactive, computed } from 'vue';

const pageConfiguration = reactive({
  format: PAGE_FORMATS.A5,
  orientation: ORIENTATION_PORTRAIT,
});

const svgClass = computed(() => {
  return `${pageConfiguration.format} ${pageConfiguration.orientation}`;
});
</script>

<style lang="scss">
@import '../assets/common.scss';
@import '../assets/printables.scss';
</style>
