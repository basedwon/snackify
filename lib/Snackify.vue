<template>
  <v-snackbar 
    v-model="show" 
    v-bind="options"
    multi-line
    app
    >
    <span>{{ options.msg }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn :icon="icon" color="white" text v-bind="attrs" @click.native="show = false">
        <v-icon v-if="icon">mdi-close</v-icon>
        <template v-else>Close</template>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackify',
  computed: {
    options () {
      return this.$store.getters['snackify/options']
    },
    icon () {
      return this.$store.state.snackify.icon
    },
    show: {
      get () { return this.$store.state.snackify.active },
      set (value) { this.$store.commit('snackify/setActive', value) }
    },
  },
  watch: {
    show (curr, prev) {
      if (curr && !prev) return
      setTimeout(() => {
        this.$store.dispatch('snackify/next')
      }, 300)
    },
  },
}
</script>
