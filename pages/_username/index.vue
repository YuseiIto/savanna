<template>
  <div class="container">
    <userHeader v-if="!notFound" :dbUser="dbUserData" />
  </div>
</template>
<script>
import firebase from "../../plugins/firebase";
import userHeader from "../../components/userHeader";
export default {
  data() {
    return { dbUserData: null, notFound: true };
  },
  components: {
    userHeader
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
        }
      });
  }
};
</script>
<style>
.container {
  border: solid 1px #000000;
  display: flex;
  flex-direction: column;
}
</style>
