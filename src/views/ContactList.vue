<template>
  <div class="content-centered contact-list-container" style="padding: 0 !important">
   <div class="indicators">

   </div>
   <div class="prospect-list">
     <div class="cta-line">
       <label class="contact-title">All contacts</label>
       <text-field placeholder="Quick search" class="quick-search"></text-field>
     </div>
   </div>
  </div>
</template>
<script>
import TextField from "@/components/TextFieldWithPlaceholder";
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

.contact-title {
  font-weight: bold;
  float: left;
  margin-right: 20px;
}

.prospect-list {
  padding-left: 15px;
}

.quick-search {
  width: 30%;
}

.cta-line {
  padding-left: 15px;
  height: 30px;
}

.cta-line label, .cta-line div {
  height: 100%;
  line-height: 30px;
}

.contact-list-container {
  width: 100%;
  height: 100%;
}
</style>
