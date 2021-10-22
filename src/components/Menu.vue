<template>
  <div class="menu">
      <menu-item css="fas fa-users" label="Prospects"></menu-item>
  </div>
</template>
<script>
import MenuItem from "./MenuItem"
export default {
    name: "Menu",
    data() {
        return {
        }
    },
    methods: {
        
    },
    components: {
        "menu-item": MenuItem
    }
}
</script>

<style scoped>
.menu {
    height: 100%;
    border-right: solid 1px #E1E1E1;
}
</style>
