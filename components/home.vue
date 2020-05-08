<template>
  <div>
    <logo />
    <h3 class="title is-5">Sign in to start NOW!</h3>
    <google-sign-in-btn @click="signIn" />
  </div>
</template>
<script>
import logo from "./logo";
import googleSignInBtn from "./googleSignInBtn";
import firebase from "../plugins/firebase";

export default {
  components: { logo, googleSignInBtn },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }
};
</script>
