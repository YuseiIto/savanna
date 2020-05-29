<template>
  <div class="container">
    <userHeader v-if="!notFound" :dbUser="dbUserData" />
    <userProjects :projects="userProjects" />
  </div>
</template>
<script>
import firebase from "../../plugins/firebase";
import userHeader from "../../components/userHeader";
import userProjects from "../../components/userProjects";

export default {
  data() {
    return { dbUserData: null, notFound: true, userProjects: [] };
  },
  components: {
    userHeader,
    userProjects
  },
  mounted() {
    const that = this;
    firebase
      .firestore()
      .collection("users")
      .where("username", "==", this.$route.params.username)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          this.notFound = true;
        } else {
          this.notFound = false;
          snapshot.forEach(doc => {
            that.dbUserData = doc.data();
          });

          // Get projetcs
          const projects = [];
          firebase
            .firestore()
            .collection("projects")
            .where("author", "==", that.dbUserData.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(e => {
                that.userProjects.push(e.data());
              });
            });
        }
      });
  }
};
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
