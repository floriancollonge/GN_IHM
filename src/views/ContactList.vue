<template>
  <div class="content-centered start-screen" style="padding: 0 !important">
    <transition name="fade" v-on:after-leave="afterLeave">
      <div v-if="enter" class="start-screen-container" @click="enterWebsite">
        <div id="logo-img">SALUT !!!!!</div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "resetPassword",
  data() {
    return {
      enter: true,
      tenant_type: ""
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
  color: white;
}

.start-screen-container {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-screen-container img {
  width: auto;
  height: 45%;
}

</style>
