<template>
  <component
    :is="componentName"
  />
</template>


<script>
  import { mapState } from 'vuex'

  import Part from '~/pages/showcase/part/part.vue'
  import Section from '~/pages/showcase/section/section.vue'

  export default {
    name: 'Showcase',

    components: {
      Part,
      Section
    },
    
    async fetch ({ store, params, error }) {
      await store.dispatch('modules/showcase/configuration/GET_CONFIGURATION', {
          CODE: params.id
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'Страница не найдена' })
      })
    },

    computed: {
      ...mapState({
        marker: state => state.modules.showcase.configuration.MARKER,
        elements: state => state.modules.showcase.configuration.ELEMENTS,
        meta_tags: state => state.modules.showcase.configuration.META_TAGS,
        part: state => state.modules.showcase.configuration.PART,
      }),

      componentName () {
        if (this.marker == 'PART' && this.part) return 'Part'
        if (this.marker == 'SECTION' && this.elements) return 'Section'

        return null
      }
    }
  }
</script>
