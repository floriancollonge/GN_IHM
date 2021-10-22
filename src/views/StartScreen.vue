<template>
  <div class="content-centered start-screen" style="padding: 0 !important">
    <div v-for="user in users" :key=user.idUser @click="selectUser(user.idUser)">
      <transition name="fade">
        <user-capsule :name="user.firstName + ' ' + user.lastName"></user-capsule>
      </transition>
    </div>
    <transition name="fade">
      <add-user-capsule @click="addUser()"></add-user-capsule>
    </transition>
  </div>
</template>
<script>
import axios from "axios"
import UserCapsule from "../components/UserCapsule"
import AddUserCapsule from "../components/AddUserCapsule"

export default {
  name: "startScreen",
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
      .catch(error => console.log(error));
  },
  methods: {
    selectUser(idUser) {
      sessionStorage.setItem("idUser", idUser);
      this.$router.push({ name: "ContactList" })
    },
    addUser() {
      alert("Be patient, it will be available soon !");
    }
  },
  components: {
    "user-capsule": UserCapsule,
    "add-user-capsule": AddUserCapsule
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

.start-screen {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
