<template>
  <div class="user-capsule">
    <span class="user-capsule-img"><img src="https://img.icons8.com/glyph-neue/64/000000/panda.png"/></span>
    <span class="user-capsule-name">{{name}}</span>
  </div>
</template>
<script>
export default {
  name: "userCapsule",
  data() {
    return {
      enter: true,
      tenant_type: ""
    }
  },
  mounted() {
      console.log(this.name);
  },
  props: ["name"],
  methods: {

  }
}
</script>

<style scoped>
.user-capsule {
    background-color: white;
}

.user-capsule-img, .user-capsule-name {
    width: 45px;
    height: 45px;
}

</style>
