<template>
  <div style="display:flex;flex-direction: column;">
    <userHeader :user="userData" :dbUser="dbUserData" />
    <create-button label="New Project" to="/new" />
    <user-projects :projects="userProjects" :username="dbUserData!=null?dbUserData.username:''" />
  </div>
</template>
<script>
import firebase from "../plugins/firebase";
import userHeader from "./userHeader";
import createButton from "./createButton";
import userProjects from "./userProjects";
export default {
  components: {
    userHeader,
    createButton,
    userProjects
  },
  data() {
    return { userData: null, dbUserData: null, userProjects: [] };
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

        // Get projetcs
        const projects = [];
        firebase
          .firestore()
          .collection("projects")
          .where("author", "==", this.userData.uid)
          .get()
          .then(snapshot => {
            snapshot.forEach(e => {
              that.userProjects.push(e.data());
            });
          });
      });
  }
};
</script>

