<template>
  <div class="content-centered contact-list_container" style="padding: 0 !important">
   <div class="search-panel">
     <text-field label="Search a prospect by his name" />
   </div>
  </div>
</template>
<script>
import TextField from "@/components/TextField";
export default {
  name: "ContactList",
  data() {
    return {
      label: ""
    }
  },
  created() {
  },
  methods: {

  },
  components: {
    "text-field": TextField
  }
}
</script>

<style scoped>

.contact-list_container {
  width: 100%;
  height: 100vh;
}

</style>
