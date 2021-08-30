export const state = () => ({
  MARKER: null,

  FILTER: null, 
  FILTER_SECTION: null,
  META_TAGS: null,

  SECTION: null,
  ELEMENTS: null,

  PART: null,

  isLoading: false
})


export const mutations = {
  async SET_CONFIGURATION(state, data) {
    state.MARKER = data.MARKER

    if (data.MARKER == 'SECTION') {
      const { ITEMS, FILTER } = data.ENTITY

      state.FILTER = FILTER.FILTER
      state.FILTER_SECTION = FILTER.SECTION
      state.META_TAGS = FILTER.META_TAGS

      state.SECTION = ITEMS.SECTION
      state.ELEMENTS = ITEMS.ELEMENTS
    }

    if (data.MARKER == 'PART') {
      state.PART = data.ENTITY.PART
    }
  },

  async CLEAR_DATA(state) {
    state.MARKER = null

    state.FILTER = null
    state.FILTER_SECTION = null
    state.META_TAGS = null

    state.SECTION = null
    state.ELEMENTS = null

    state.PART = null
  }
}

export const actions = {
  async GET_CONFIGURATION ({ commit }, postData) {
    try {
      await commit('CLEAR_DATA')

      const data = await this.$apiRequest({
        api: 'get-showcase-configuration',
        method: 'Bitrix_Configuration',
        req: postData
      })

      if (data.MARKER == '404') {
        throw data.error
      }

      if (data.MARKER == 'SECTION' || data.MARKER == 'PART') {
        await commit('SET_CONFIGURATION', data)

        return data.MARKER
      }

      throw data.error
    }
    
    catch (error) {
      throw error
    }
  },

  async CLEAR_CONFIGURATION ({ commit }) {
    await commit('CLEAR_DATA')
  }
}