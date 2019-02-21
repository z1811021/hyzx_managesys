<template>
  <div id="app">
    <router-view v-if="isReloadAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
    provide() {
         return {
             reload: this.reload
         }
    },
    data(){
        return {
          isReloadAlive : true
         }
    },
    methods: {
        reload() {
          this.isReloadAlive = false;
          this.$nextTick(function(){
            this.isReloadAlive = true;
          })
        }
    }
}
</script>

<style>

</style>
