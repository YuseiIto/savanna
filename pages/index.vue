<template>
  <div>
    <div class="container">
      <logo />
      <h3 class="title is-5">Sign in to start NOW!</h3>
      <google-sign-in-btn @click="signIn" />
    </div>
    <footer class="footer-white">&copy;Yusei Ito 2019</footer>
  </div>
</template>

<script>
import logo from "~/components/logo.vue";
import googleSignInBtn from "~/components/googleSignInBtn.vue";
import firebase from "~/plugins/firebase.js";

export default {
  components: { logo, googleSignInBtn },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();

      const that = this;

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          that.$store.commit("setAccessToken", token);
          that.$store.commit("setUser", user);
          that.$router.push("/register");
          console.log("token: " + token + "  User:" + user);
        });
    }
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
