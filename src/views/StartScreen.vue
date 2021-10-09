<template>
  <div class="content-centered start-screen" style="padding: 0 !important">
    <transition name="fade" v-on:after-leave="afterLeave">
      <div v-if="enter" class="start-screen-container" @click="enterWebsite">
        <div style="color:white">OK je passe là !</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "resetPassword",
  data() {
    return {
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped>
.start-screen {
  width: 100%;
  height: 100vh;
  background-color: black;
}

</style>
