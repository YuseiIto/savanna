<template>
  <div style="display:flex;flex-direction: column;">
    <logo />
    <h6 class="title is-5">New to Savannah?</h6>
    <h3 class="title is-3">Register username</h3>
    <input type="text" placeholde="Put your username" v-model="username" />
    <p v-if="!isValidUsername" style="color:#E51616">{{errorMessage}}</p>
    <input type="button" value="Register" @click="register" />
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import logo from "./logo";

export default {
  components: {
    logo
  },
  data() {
    return {
      db: null,
      username: "",
      errorMessage: "",
      isValidUsername: false
    };
  },
  mounted() {
    this.db = firebase.firestore();
  },
  watch: {
    username: function(val) {
      const pattern = /^[-0-9a-zA-Z_.]+$/g;
      const result = val.match(pattern) == val;

      if (val === "") {
        this.errorMessage = "Username is required";
        return false;
      } else {
        if (result) {
          this.db
            .collection("users")
            .where("username", "==", val)
            .get()
            .then(snapshot => {
              if (snapshot.empty) {
                this.errorMessage = "";
                this.isValidUsername = true;
              } else {
                this.errorMessage = "This username is already taken";
                this.isValidUsername = false;
              }
            });
        } else {
          this.errorMessage = "The username contains invalid character(s).";
          this.isValidUsername = false;
        }
      }
    }
  },
  methods: {
    register() {
      console.log("Called");
      if (this.isValidUsername) {
        //When the username available
        console.log("Called");
        const that = this;

        this.db
          .collection("users")
          .add({
            username: this.username,
            uid: firebase.auth().currentUser.uid,
            lowerUsername: this.username.toLowerCase(),
            bio: "",
            followings: [],
            projects: [],
            photoURL: firebase.auth().currentUser.photoURL,
            name: firebase.auth().currentUser.displayName
          })
          .then(docRef => {
            that.$store.dispatch("setDbUid", docRef.id);
            that.$emit("complete");
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    }
  }
};
</script>
