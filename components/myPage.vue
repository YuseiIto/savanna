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
  font-weight: bold;
  padding: 10px;
  background-color: #0095f6;
  border-radius: 5px;
  padding-left: 70px;
  padding-right: 70px;
  transition: 0.7s;
  box-shadow: 4px 3px 9px -4px #727272;
}

.new-project:hover {
  color: #ffffff;
  background-color: #0095f6bb;
}
</style>
