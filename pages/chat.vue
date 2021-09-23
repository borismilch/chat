
<template>
  <div class="c-wrap">
    <div class="c-chat" ref="block">
     <Message v-for="{ text, name, id } in messages" :name="name" :key="text + new Date() + Math.random()" :text="text" :owner="user.id === id " />
    </div>
  <SendForm class="c-form" />
  </div>
</template>


<script>
import chatMiddleWare from '../middleware/chat'
import { mapGetters } from 'vuex'
import Message from '@/components/Mesage.vue'
import SendForm from '@/components/SendForm.vue'
export default {
  computed: {
    ...mapGetters(['user', 'messages'])  
  },
  head () {
    return {
      title: this.user.room + ' | ' + 'builochat'   
    }  
  },
  watch: {
    messages () { try{ setTimeout(() =>  this.$refs.block.scrollTop = this.$refs.block.scrollHeight) } catch (e) {} }
  }, 
  middleware: chatMiddleWare,
  components: { Message, SendForm }
}
</script>

<style scoped>
.c-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.c-form {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 10px;
  height: 80px;
  background:  #212121;
}
.c-chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
</style>
