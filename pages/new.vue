<template>
  <div class="container">
    <div class="new-content">
      <h3 class="title is-2">Create new project</h3>

      <input
        class="project-name"
        type="text"
        placeholder="Project name"
        v-model="name"
        pattern="^[-0-9a-zA-Z_.]+$"
      />
      <p v-if="!isAvailableName" style="color:#E51616">
        {{
          name == ""
            ? "Username is required"
            : "This project name is unavailable."
        }}
      </p>

      <textarea
        class="project-description"
        v-model="description"
        placeholder="Description"
      ></textarea>
      <label class="new-checkbox">
        <input type="checkbox" v-model="isPrivate" />
        Make this project private
      </label>
    </div>
    <input
      type="button"
      value="Create"
      color="#ffffff"
      class="create-btn"
      @click="createNew"
    />
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      description: "",
      name: "",
      isPrivate: false,
      dbUserData: null,
      unAvailableNames: [],
      uid: ""
    };
  },
  mounted() {
    const that = this;
    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      that.uid = uid;
      // Get userdata
      firebase
        .firestore()
        .collection("users")
        .where("uid", "==", uid)
        .get()
        .then(snapshot => {
          snapshot.forEach(function(doc) {
            that.dbUserData = doc.data();
            console.log(that.dbUserData);
          });
        });

      // Get unavailable names
      firebase
        .firestore()
        .collection("projects")
        .where("author", "==", uid)
        .get()
        .then(snapshot => {
          snapshot.forEach(function(doc) {
            console.log(doc);
            that.unAvailableNames.push(doc.data().name);
          });
        });
    });
  },
  computed: {
    isAvailableName() {
      const pattern = /^[-0-9a-zA-Z_.]+$/g;
      const result = this.name.match(pattern) == this.name;

      console.log(this.unAvailableNames.indexOf(this.name));
      if (this.unAvailableNames.indexOf(this.name) >= 0 || !result) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    createNew() {
      const uid = firebase.auth().currentUser.uid;
      const newProject = {
        author: uid,
        description: this.description,
        isPrivate: this.isPrivate,
        name: this.name,
        reactions: [],
        tags: [],
        commits: []
      };

      const that = this;

      firebase
        .firestore()
        .collection("projects")
        .add(newProject)
        .then(docRef => {
          that.$router.push(
            `/${this.dbUserData.username}/${encodeURI(this.name)}`
          );
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #ffffff;
  border-radius: 13px;
  flex-direction: column;
}

.new-content {
  align-items: left;
  text-align: left;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.project-name {
  border: none;
  border-bottom: solid #333333 1px;
  transition: 0.5s;
  font-size: 20px;
  width: 300px;
  text-align: left;
  font-weight: bold;
}

.project-name:hover {
  border-bottom: solid #333333 2px;
}

.project-description {
  width: 300px;
  height: 80px;
  margin-top: 10px;
  border: solid 1px #707070;
  padding: 15px;
  border-radius: 5px;
}

.new-checkbox {
  margin-top: 30px;
  color: #333333;
}

.create-btn {
  width: 500px;
  margin-top: 50px;
  border: none;
  border-radius: 20px;
  font-size: 20px;
  padding: 5px;
  background-color: #156a25;
  color: #ffffff;
  font-weight: bold;
  transition: 1s;
}

.create-btn:hover {
  background-color: #156a25aa;
}
</style>
