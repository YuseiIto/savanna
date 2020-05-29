<template>
  <div style="display:flex;flex-direction: column;">
    <userHeader :user="userData" :dbUser="dbUserData" />
    <create-button label="New Project" to="/new" />
  </div>
</template>
<script>
import firebase from "../plugins/firebase";
import userHeader from "./userHeader";
import createButton from "./createButton";

export default {
  components: {
    userHeader,
    createButton
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

