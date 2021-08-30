<template>
  <div
    v-if="orderedFields"
    class="tbl-box"
  >
    <div class="tbl-container">
      <div class="tbl-overlay bg-sc br-2">
        <slot name="header"></slot>
        
        <div
          class="tbl tbl-content"
          :style="{ 'grid-template-columns': columnsTemplate, 'grid-auto-rows': '40px' }"
        >
          <HeadField
            v-for="(value, id) in fields"
            :key="id"
            v-bind="{ id, value, isSorting: isSorting(id) }"
            @sorting-action="$emit('sorting-action', id)"
          >
            <slot
              v-if="headSlots && headSlots[id]"
              :name="headSlots[id]"
            />
          </HeadField>

          <ContentField
            v-for="({ rowID, id, value, quantity }) in orderedFields"
            :key="getUniqueKey(rowID, id)"
            :hoveredRowID.sync="hoveredRowID"
            v-bind="{ rowID, id, value, quantity, hasAction: hasRowAction }"
            @field-action="$emit('field-action', content[rowID], id)"
          >
            <slot
              v-if="contentSlots && contentSlots[id]"
              :name="contentSlots[id]"
              v-bind="{ rowID, details: content[rowID] }"
            />
          </ContentField>
        </div>

        <slot name="footer"></slot>
      </div>

      <slot name="subFooter"></slot>
    </div>

    <ShowMore
      v-if="hasRowsMore"
      @show-more="showMore"
    />
  </div>
</template>


<script>
  import ContentField from '~/components/table/content-field/content-field.vue'
  import HeadField from '~/components/table/head-field/head-field.vue'
  import ShowMore from '~/components/table/show-more/show-more.vue'

  export default {
    name: 'Table',

    components: {
      ContentField,
      HeadField,
      ShowMore
    },

    props: {
      fields: {
        default: null,
        type: Object
      },

      content: {
        default: null,
        type: Array
      },

      rowsLimit: {
        default: null,
        type: Number
      },

      hasRowAction: {
        default: false,
        type: Boolean
      },

      currentPage: {
        default: 1,
        type: Number
      },

      pageUnicKey: {
        default: '',
        type: String
      },

      headSlots: {
        default: null,
        type: Object
      },

      contentSlots: {
        default: null,
        type: Object
      },

      sortingFields: {
        default: null,
        type: Object
      },
    },

    data: () => ({
      hoveredRowID: null,
      showedRowsCount: 0,
    }),

    mounted() {
      if (this.rowsLimit) {
        this.showedRowsCount = this.rowsLimit
      }
    },

    computed: {
      columnsTemplate() {
        if (this.fields) {
          return 'repeat(' + Object.keys(this.fields).length + ', auto)'
        }

        return null
      },

      orderedFields() {
        if (this.fields && this.content) {
          let list = []

          for (const index in this.content) {
            if (this.rowsLimit && index >= this.showedRowsCount) {
              return list
            }

            const item = this.content[index]

            for (const id in this.fields) {     
              list.push({
                id: id,
                rowID: index,
                value: item[id] ? item[id] : '',
                quantity: item.amount ? +item.amount : +item.quantity
              })
            }
          }

          return list
        }

        return null
      },

      hasRowsMore() {
        if (this.rowsLimit && this.content?.length > this.showedRowsCount) return true

        return false
      }
    },

    methods: {
      getUniqueKey(rowID, field) {
        return 'cell-' + rowID + '-' + field + '_page-' + this.currentPage + this.pageUnicKey
      },

      showMore() {
        this.showedRowsCount = this.content.length
      },

      isSorting(fieldName) {      
        return this.sortingFields?.[fieldName]
      }
    }
  }
</script>


<style>
  .tbl-box {
    max-width: 100%;
  }
  .tbl-container {
    max-width: 100%;
    overflow-x: auto;
  }
  .tbl-overlay {
    display: inline-block;
    border: 1px solid rgb(215, 215, 215);
  }
  .tbl {
    display: grid;
  }
  .tbl__head-field,
  .tbl__item-field {
    position: relative;
    grid-template-columns: minmax(min-content, auto);
  }
  .tbl__item-field {
    border-top: 1px solid rgba(0, 0, 0 , .12);
    transition: background-color 0.2s cubic-bezier(.25, .8, .25, 1);
  }
  .tbl__field-content {
    max-height: 32px;
    padding: 0 10px;
    align-self: center;
    word-wrap: break-word;
    overflow-y: hidden;
  }

  /* custom fields */
  .tbl__head-field.checkbox,
  .tbl__item-field.checkbox,
  .tbl__head-field.menu,
  .tbl__item-field.menu {
    grid-template-columns: 45px;
  }
  .tbl__head-field.title,
  .tbl__item-field.title {
    max-width: 300px;
  }
  .tbl__head-field.price,
  .tbl__head-field.summ,
  .tbl__item-field.price,
  .tbl__item-field.summ {
    grid-template-columns: minmax(max-content, auto);
  }
  .tbl__head-field.options,
  .tbl__item-field.options {
    min-width: 200px;
    max-width: 400px;
  }
  .tbl__item-field.price .tbl__field-content,
  .tbl__item-field.summ .tbl__field-content {
    font: 14px/32px "Roboto-Medium", sans-serif;
  }
  .tbl__item-field.product_btn .icon {
    place-self: center;
  }
</style>