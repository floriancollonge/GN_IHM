<template>
  <div class="menu-item">
      <i :class="css" style="float: left"></i>
      <div class="label-menu-item">{{label}}</div>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
    }
  },
  methods: {
    
  },
  props: ["css", "label"]
}
</script>

<style scoped>
.menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 20%;
    height: 50px;
}

.label-menu-item {
    float: left;
    margin-left: 10px;
}
</style>
