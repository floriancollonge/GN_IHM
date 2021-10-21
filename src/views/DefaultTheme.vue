<template>
    <div class="default-container">
        <div class="left-side-menu">
            <Menu></Menu>
        </div>
        <div class="center-panel">
            <router-view></router-view>
        </div>
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

.center-panel {
    float: left;
    width: calc(100% - 300px);
    height: 100vh;
}
</style>
