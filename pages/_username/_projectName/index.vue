<template>
  <div class="container">
    <div class="proj-content">
      <h3 class="title is-4">
        <nuxt-link :to="`/${username}`">
          <span class="proj-username">{{ username }}</span>
        </nuxt-link>
        /{{ projectName }}
      </h3>
    </div>
    <p class="prj-description">
      {{ projectData == null ? "" : projectData.description }}
    </p>

    <div v-if="projectData != null">
      <savannah :projectData="projectData" />
      <commit-logs :projectData="projectData" />
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";
import savannah from "~/components/savannah";
import commitLogs from "~/components/commitLogs";

export default {
  components: { savannah, commitLogs },
  data() {
    return {
      userData: null,
      username: this.$route.params.username,
      projectName: this.$route.params.projectName,
      projectData: null
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
          .doc(`${this.username}::${this.projectName}`)
          .get()
          .then(doc => {
            that.projectData = doc.data();
          });
      });
  }
};
</script>
<style>
.container {
  width: 80%;
  padding-top: 30px;
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

.prj-description {
  padding-top: 20px;
  padding-left: 20px;
}
</style>
