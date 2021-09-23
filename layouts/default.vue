<template>
  
<v-app app dark>
  <v-navigation-drawer app v-model="drawer" mobile-breakpoint="750">
     <v-card
    max-width="450"
    class="mx-auto"
  >
    <v-toolbar
      dark
    >
      <v-toolbar-title>New Room</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
   <v-list subheader>
      <v-subheader>Recent chat</v-subheader>

      <v-list-item
        v-for="u in users"
        :key="+u.id"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${u.name} avatar`"
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{u.name}}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon :color=" u.id === user.id ? 'deep-purple accent-4' : 'grey'">
            mdi-message
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
  </v-navigation-drawer>
  <v-app-bar app>
  <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
  <v-btn icon @click="exit"> <v-icon color="light darken-2"> mdi-arrow-left </v-icon> </v-btn> 
    <v-toolbar-title class="mx-3"> Room: {{user.room}}</v-toolbar-title>
  </v-app-bar>

  <v-main>

    <div fluid style="height: 100%"> <nuxt /> </div>
  </v-main>
</v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    drawer: true,
  }),
 computed: mapGetters(['user', 'users']),
 methods: {
   ...mapMutations(['clearData']),
   exit () {
     this.$socket.emit('userLeft', this.user.id, data => { console.log(data) })
     this.$router.push('/?message=leftChat')
     this.clearData()
   }
 }
}
</script>

<style>

</style>