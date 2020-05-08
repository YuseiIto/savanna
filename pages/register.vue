<template>
  <div class="container">
    <logo />
    <h6 class="title is-5">New to Savannah?</h6>
    <h3 class="title is-3">Register username</h3>
    <input type="text" placeholde="Put your username" @change="onChange" />
    <input type="button" value="Register" />
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import logo from "~/components/logo";
export default {
  components: {
    logo
  },
  data() {
    return {
      db: null
    };
  },
  mounted() {
    this.db = firebase.firestore();
  },
  methods: {
    onChange() {
      this.db
        .collection("users")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${doc.data()}`);
          });
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
  align-items: center;
  flex-direction: column;
}
</style>
