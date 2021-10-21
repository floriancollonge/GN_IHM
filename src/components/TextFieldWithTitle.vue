<template>
  <div class="input-container">
    <input class="input-effect" type="text">
    <label>{{label}}</label>
    <span class="focus-bg"></span>
  </div>
</template>
<script>
export default {
  name: "TextFieldWithTitle",
  data() {
    return {
    }
  },
  methods: {
    
  },
  props: ["label"]
}
</script>

<style scoped>
.input-container{
  float: left; 
  margin-top: 20px; 
  position: relative;
} /* necessary to give position: relative to parent. */

input[type="text"]{
  font: 15px/24px "Lato", Arial, sans-serif; 
  color: #333; 
  width: 100%; 
  box-sizing: border-box; 
  letter-spacing: 1px;
}

.input-effect{
  border: 0; 
  padding: 7px 15px; 
  border: 1px solid #ccc; 
  position: relative; 
  background: transparent;
}

.input-effect ~ .focus-bg:before,
.input-effect ~ .focus-bg:after{
  content: ""; 
  position: absolute; 
  left: 0; 
  top: 0; 
  width: 0; 
  height: 0; 
  background-color: #ededed; 
  transition: 0.3s; 
  z-index: -1;
}
.input-effect:focus ~ .focus-bg:before,
.has-content.input-effect ~ .focus-bg:before{
  transition: 0.3s; 
  width: 50%; 
  height: 100%;
}
.input-effect ~ .focus-bg:after{
  left: auto; 
  right: 0; 
  top: auto;
  bottom: 0;
}
.input-effect:focus ~ .focus-bg:after,
.has-content.input-effect ~ .focus-bg:after{
  transition: 0.3s; 
  width: 50%; 
  height: 100%;
}
.input-effect ~ label{
  position: absolute; 
  left: 14px; 
  width: 100%; 
  top: 10px; 
  color: #aaa; 
  transition: 0.3s; 
  z-index: -1; 
  letter-spacing: 0.5px;
}
.input-effect:focus ~ label, .has-content.input-effect ~ label{
  top: -18px; 
  left: 0; 
  font-size: 12px; 
  color: #333; 
  transition: 0.3s;
}

</style>
