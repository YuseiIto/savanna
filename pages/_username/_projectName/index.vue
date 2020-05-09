<template>
  <div class="container">
    <div class="proj-content">
      <h3>
        <span class="title is-4">
          <nuxt-link :to="`/${username}`">
            <span class="proj-username">{{ username }}</span>
          </nuxt-link>
        </span>
        <span class="title is-3">/{{ projectName }}</span>
      </h3>
    </div>
    <p>{{projectObj==null?"":projectObj.description}}</p>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";
export default {
  data() {
    return {
      userData: null,
      username: this.$route.params.username,
      projectName: this.$route.params.projectName,
      projectObj: null
    };
  },
  mounted() {
    const that = this;

    firebase
      .firestore()
      .collection("users")
      .where("username", "==", this.username)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          that.userData = doc.data();
        });
      })
      .then(res => {
        firebase
          .firestore()
          .collection("projects")
          .where("author", "==", this.userData.uid)
          .where("name", "==", this.projectName)
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              that.projectObj = doc.data();
            });
          });
      });
  }
};
</script>
<style>
.container {
  width: 800px;
  border: #000000 solid 2px;
  padding: 30px;
}
.proj-content {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

.proj-username {
  color: #333333;
  border-bottom: 3px solid #333333;
}
</style>
