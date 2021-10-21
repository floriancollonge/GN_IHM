<template>
  <div class="input-container">
    <input :placeholder="placeholder" type="text">
  </div>
</template>
<script>
export default {
  name: "TextFieldWithPlaceholder",
  data() {
    return {
    }
  },
  methods: {
    
  },
  props: ["placeholder"]
}
</script>

<style scoped>
.input-container{
  float: left; 
  position: relative;
} /* necessary to give position: relative to parent. */

input[type="text"]{
  font: 15px/24px "Lato", Arial, sans-serif; 
  color: #333; 
  width: 100%; 
  box-sizing: border-box; 
  letter-spacing: 1px;
}

</style>
