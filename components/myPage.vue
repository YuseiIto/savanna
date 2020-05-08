<template>
  <div style="display:flex;flex-direction: column;">
    <userHeader :user="userData" :dbUser="dbUserData" />
    <nuxt-link to="/new"><a class="new-project">New Project</a></nuxt-link>
  </div>
</template>
<script>
import firebase from "../plugins/firebase";
import userHeader from "./userHeader";

export default {
  components: {
    userHeader
  },
  data() {
    return { userData: null, dbUserData: null };
  },
  created() {
    this.userData = firebase.auth().currentUser;
    const that = this;
    firebase
      .firestore()
      .collection("users")
      .where("uid", "==", this.userData.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(function(doc) {
          that.dbUserData = doc.data();
          console.log(that.dbUserData);
        });
      });
  }
};
</script>
<style>
.new-project {
  text-decoration: none;
  color: #ffffff;
  padding: 10px;
  background-color: #0095f6;
}
</style>
