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
  </div>
</template>
<script>
import firebase from "../../plugins/firebase";
export default {
  data() {
    return {
      userData: null,
      username: this.$route.params.username,
      projectName: this.$route.params.projectName,
      pojectObj: null
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("projects")
      .where("author", "==", this.username)
      .where("name", "==", this.projectName)
      .get()
      .then(snapshot => {
        that.projectObj = snaphot[0].data();
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
