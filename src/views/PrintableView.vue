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
      <button @click="printPage">Print page</button>
    </section>
    <svg
      :class="svgClass"
      ref="svgRef"
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="svgViewBox"
    >
      <rect y="1cm" x="1cm" width="19cm" height="12.8cm" fill="red"></rect>
    </svg>
  </main>
</template>

<script setup lang="ts">
import { jsPDF } from 'jspdf';
import 'svg2pdf.js';

import MainNavigation from '@/components/shared/MainNavigation.vue';
import {
  ORIENTATION_PORTRAIT,
  PAGE_FORMATS,
  ORIENTATION_LANDSCAPE,
  PAGE_SVG_VIEWBOX_DIMENSIONS,
} from '@/const/printables';
import { reactive, computed, ref, type Ref } from 'vue';

type pageConfigurationType = {
  format: string | number[];
  orientation: 'p' | 'portrait' | 'l' | 'landscape';
};
const pageConfiguration = reactive({
  format: PAGE_FORMATS.A5,
  orientation: ORIENTATION_PORTRAIT,
} as pageConfigurationType);

const svgClass = computed(() => {
  return `${pageConfiguration.format} ${pageConfiguration.orientation}`;
});

const svgWidth = computed(() => {
  return `${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].width
  }${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].unit
  }`;
});

const svgHeight = computed(() => {
  return `${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].height
  }${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].unit
  }`;
});

const svgViewBox = computed(() => {
  return `0 0 ${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].width
  }${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].unit
  } ${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].height
  }${
    PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].unit
  }`;
});

const svgRef: Ref<HTMLElement | null> = ref(null);

const printPage = () => {
  const doc = new jsPDF({
    orientation: pageConfiguration.orientation,
    format: pageConfiguration.format,
    unit: PAGE_SVG_VIEWBOX_DIMENSIONS[pageConfiguration.format][
      pageConfiguration.orientation
    ].unit,
  });

  const refSvgValue = svgRef.value as HTMLElement;
  doc.svg(refSvgValue, {}).then(() => {
    // save the created pdf
    doc.output('dataurlnewwindow', { filename: 'tusee-daily.pdf' });
  });
};
</script>

<style lang="scss">
@import '../assets/common.scss';
@import '../assets/printables.scss';
</style>
