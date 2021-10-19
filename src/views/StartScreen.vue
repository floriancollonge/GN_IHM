<template>
  <div class="content-centered start-screen" style="padding: 0 !important">
    <div v-for="user in users" :key=user.id_user>
      <transition name="fade">
        <user-capsule :name="user.firstName + ' ' + user.lastName"></user-capsule>
      </transition>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import UserCapsule from "../components/UserCapsule"

export default {
  name: "StartScreen",
  data() {
    return {
      users: []
    }
  },
  created() {
    var instance = this;
    axios
      .get('http://localhost:5003/v1/users')
      .then(function (response) {
        instance.users = Object.assign([], response.data);
      })
      .catch(error => console.log(error))
  },
  methods: {
    
  },
  components: {
    "user-capsule": UserCapsule
  }
}
</script>

<style scoped>

.start-screen {
  width: 100%;
  height: 100vh;
  background-color: black;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
