<template>
  <v-flex>
    <v-text-field
      label="Введіть текст"
      v-model="text"
      @keydown.enter="sendMessage"
      filled
    ></v-text-field></v-flex>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({ text: '' }),
  computed: mapGetters(['user']),
  methods: {
    sendMessage () {
      if(!this.text) return
      this.$socket.emit('createMessage', { name: this.user.name, text: this.text, id: this.user.id }, data => {
        if (typeof data === 'string') console.error(data)
        else this.text = ''  
      })  
    }
  }
}
</script>

<style>

</style>