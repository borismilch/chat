<template>
  <v-layout column justify-center align-center>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-flex xs12 sm8 md6>
    <v-card width = "600">
      <v-card-title class="text-h4 font-weight-bold">
        Nuxt chat
      </v-card-title>
      <v-card-text>
      <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="16"
      :rules="nameRules"
      label="Ваше ім'я"
      required
    ></v-text-field>

    <v-text-field
      v-model="room"
      :rules="roomRules"
      label="Your room"
      required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4"
      @click="submit"
    >
      Validate
    </v-btn>

  </v-form>
  </v-card-text>
     </v-card>

    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  layout: "empty",
  head: {
    title: 'Personalize | builohcat'
  },
  data: () => ({
    snackbar: false,
    text: 'My timeout is set to 2000.',
    timeout: 6000,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Room is required',
      v => (v && v.length <= 18) || 'Room name must be less than 18 characters',
    ]  
  }),
  mounted () {
    const obj = { noUser: 'Введіть вхідні данні', leftChat: 'Ви вийшли із кімнати' }
    if (this.$route.query.message) {
      this.text = obj[this.$route.query.message]
      this.snackbar = true
    }

  },
  sockets: {
  connect: function () {
    console.log('socket connected')
  }
 },
 methods: {
  ...mapMutations(['setUser']),
  submit () {
    if (this.$refs.form.validate()) {
      const user = { name: this.name, room: this.room }
      this.$socket.emit('userJoined', user, data => {
        if (typeof data === 'string') { console.error(data); return }
        user.id = data.userId
        this.setUser(user)
        this.$router.push('/chat')

      })
    } else  if (this.$refs.form.validate()) {}
  },
 }
}
</script>
<style>
  * {
  scrollbar-width: thin;
  scrollbar-color: #455A64 #424242;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #424242;
}

*::-webkit-scrollbar-thumb {
  background-color: #455A64;
  border-radius: 20px;
  border: 3px solid #424242;
}
</style>