<template>
  <section class="page showcase__section">
    <breadcrumbs
      :extendedList="extendedBreadcrumbs"
      :currentTitle="currentTitle"
    />

    <h1 class="is-bounded">{{ currentTitle }}</h1>

    <div class="is-bounded showcase__section-content table">
      <Filters/>

      <Parts/>      
    </div>
  </section>
</template>


<script>
  import { mapState } from 'vuex'

  import Filters from '~/pages/showcase/section/filters/filters.vue'
  import Parts from '~/pages/showcase/section/parts/parts.vue'

  export default {
    name: 'Section',

    components: {
      Filters,
      Parts
    },

    computed: {
      ...mapState({
        section: state => state.modules.showcase.configuration.SECTION,
        meta_tags: state => state.modules.showcase.configuration.META_TAGS,

        elements: state => state.modules.showcase.configuration.ELEMENTS,
      }),

      currentTitle() {
        if (this.meta_tags?.SECTION_PAGE_TITLE) {
          return this.meta_tags.SECTION_PAGE_TITLE
        }
        
        if (this.section?.NAME) {
          return this.section.NAME
        }

        return this.$route.meta.title
      },

      extendedBreadcrumbs() {
        return this.$getExtendedBreadcrumbs(this.elements.PATH)
      },
    },

    head () {
      return { 
        title: this.meta_tags?.SECTION_META_TITLE,
        meta: [
          { hid: 'description', name: 'description', content: this.meta_tags?.SECTION_META_DESCRIPTION }
        ]
      }
    }
  }
</script>


<style>
  .showcase__section-content {
    grid-template-columns: 250px 1fr;
    column-gap: 15px;
  }
</style>