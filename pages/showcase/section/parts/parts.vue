<template>
  <preloader-box
    v-if="!isLoading"
  >
    <div
      v-if="elements"
      class="showcase__parts table"
    >
      <n-link
        no-prefetch
        v-for="({ CODE, NAME, PRICE_RS_FORMAT, PROPERTIES }) in elements.ITEMS"
        :key="CODE"
        :to="CODE"
        class="showcase__card card"
      >
        <div class="showcase__card-content">
          <Head
            v-bind="{
              brand_title: PROPERTIES.BRAND_TITLE.VALUE,
              article: PROPERTIES.ARTICLE.VALUE
            }"
          />

          <p
            v-html="NAME"
            class="fs-15 lh-18 fw-bold mb-10"
          ></p>

          <Stock
            v-bind="{ PRICE_RS_FORMAT, PROPERTIES }"
          />
        </div>
      </n-link>
    </div>
  </preloader-box>
</template>


<script>
  import { mapState } from 'vuex'

  import Head from '~/pages/showcase/section/parts/_head.vue'
  import Stock from '~/pages/showcase/section/parts/_stock.vue'


  export default {
    name: 'Parts',

    components: {
      Head,
      Stock
    },
    
    computed: {
      ...mapState({
        elements: state => state.modules.showcase.configuration.ELEMENTS,
        isLoading: state => state.modules.showcase.configuration.isLoading,
      }),
    }
  }
</script>


<style>
  .showcase__parts {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  .showcase__card-content {
    padding: 15px;
  }

  @media screen and (min-width: 768px) and (max-width: 1199px) {
    .showcase__parts {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1499px) {
    .showcase__parts {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (min-width: 1500px) {
    .showcase__parts {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>