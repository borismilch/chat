<template>
<div>
  <div v-if="name === 'admin'" class="system">
    <p class="text-center">{{text}}</p>
    <hr>  
  </div>
  <div v-else class="wrap">
    <div :class="{owner}" class="message">
     <div class="d-flex justify-space-between"><small><strong>{{name}}</strong></small> <small>{{ dateFilter(new Date(), 'time')}}</small></div>
      <p>{{text}}</p>
    </div>
    </div>
</div>  
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: Boolean
  },
  methods: { 
    dateFilter (value, format) {
      const options = {}

      if (format.includes('time')) {
        options.hour = '2-digit'
        options.minute = '2-digit'
      }

      if (format.includes('date')) {
        options.day = '2-digit'
        options.month = 'long'
        options.year = 'numeric'
      }
      const locale = 'uk-Ua'
      return new Intl.DateTimeFormat(locale, options).format(new Date(value))
    }
  },
  mounted() {
    console.log(this.dateFilter(new Date(), 'time')) 
  },

}
</script>

<style  scoped>
  .system {
    margin-bottom: 1rem; 
  } 
  .system > p {
    margin-bottom: 1rem; 
  } 
  .wrap { display: flex; flex-direction: column; }
  .message {
    padding: 1rem;
    width: 60%;
    margin: 0px 1rem;
    box-shadow: 0px 1px 0 0 rgba(50, 50, 50, 0.3);
    border-radius: 4px;
    background: #1967d2;
    margin-bottom: 1rem;
  }
   .message > p { margin-bottom: 0 }
   .owner {
    background: #fff;
    color: #000;
    align-self: flex-end;
   }
</style>