<template>
  <div>
    <div v-if="loggedIn && needRegister" class="container">
      <register @complete="evaluateState()" />
    </div>
    <div v-if="loggedIn && !needRegister" class="container">
      <h3>Mypage</h3>
    </div>

    <div v-if="!loggedIn" class="container">
      <home />
    </div>

    <footer class="footer-white">&copy;Yusei Ito 2019</footer>
  </div>
</template>

<script>
import home from "../components/home";
import register from "../components/register";
import firebase from "~/plugins/firebase.js";

export default {
  components: { register, home },
  data() {
    return { loggedIn: false, needRegister: true };
  },
  methods: {
    evaluateState() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loggedIn = true;
          this.userData = user;

          firebase
            .firestore()
            .collection("users")
            .where("uid", "==", user.uid)
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                console.log("Doesn't have account yet");

                this.needRegister = true;
              } else {
                console.log("Already has account");
                this.needRegister = false;
              }
            });
        } else {
          this.loggedIn = false;
          this.userData = null;
        }
      });
    }
  },
  mounted() {
    this.evaluateState();
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 13px;
  flex-direction: column;
}

body {
  background-color: #156a25;
  padding-top: 30px;
  padding-bottom: 60px;
  text-align: center;
  padding-right: 10px;
  padding-left: 10px;
}

.footer-white {
  padding-top: 40px;
  color: #ffffff;
}
</style>
