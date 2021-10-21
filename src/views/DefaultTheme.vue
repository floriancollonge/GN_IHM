<template>
    <div class="default-container">
        <div class="left-side-menu">
            <Menu></Menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import Menu from "@/components/Menu"
export default {
  name: "defaultTheme",
  data() {
    return {
    }
  },
  created() {},
  methods: {
  },
  components: {
      Menu
  }
}
</script>

<style>
body {
    margin: 0 !important;
}

.default-container {
    height: 100vh;
    width: 100vw;
}

.left-side-menu {
    float: left;
    width: 300px;
    height: 100vh;
}
</style>
