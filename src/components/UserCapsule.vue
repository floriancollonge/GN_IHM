<template>
  <div class="user-capsule">
    <img class="user-capsule-img" :src="require('../assets/icon_panda.png')"/>
    <div class="user-capsule-name">{{name}}</div>
  </div>
</template>
<script>
export default {
  name: "userCapsule",
  data() {
    return {
    }
  },
  props: ["name"],
  methods: {

  }
}
</script>

<style scoped>
.user-capsule {
    background-color: white;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
}

.user-capsule-img {
  max-width: 200px;
  max-height: 200px;
}

.user-capsule-name {
  width: 100%;
  text-align: center;
}

</style>
