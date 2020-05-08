<template>
  <div style="display:flex;flex-direction: column;">
    <logo />
    <h6 class="title is-5">New to Savannah?</h6>
    <h3 class="title is-3">Register username</h3>
    <input type="text" placeholde="Put your username" v-model="username" />
    <p v-if="exists" style="color:#E51616">
      This username is already taken.
    </p>
    <input type="button" value="Register" @click="register" />
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import logo from "./logo";
import isUserExists from "~/plugins/isUserExists";

export default {
  components: {
    logo
  },
  data() {
    return {
      db: null,
      username: "",
      exists: false
    };
  },
  mounted() {
    this.db = firebase.firestore();
  },
  methods: {
    register() {
      this.exists = false;
      isUserExists(this.username).then(res => {
        this.exists = res;

        if (!this.exists) {
          //When the username available
          const that = this;

          this.db
            .collection("users")
            .add({
              username: this.username,
              uid: firebase.auth().currentUser.uid,
              lowerUsername: this.username.toLowerCase(),
              bio: "",
              followings: [],
              projects: []
            })
            .then(docRef => {
              that.$store.dispatch("setDbUid", docRef.id);
              that.$emit("complete");
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            });
        }
      });
    }
  }
};
</script>
