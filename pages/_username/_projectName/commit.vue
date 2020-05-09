<template>
  <div class="container">
    <div v-if="isOK" class="content">
      <h3>New commit on {{ $route.params.projectName }}</h3>
      <input
        type="text"
        class="commit-message"
        placeholder="Commit message"
        v-model="message"
      />
      <p v-if="message == ''" style="color:#E51616">
        Commit message is required.
      </p>
      <div class="attachment">
        <h3>Attachment</h3>
        <label>
          <div
            class="attachment-file"
            :style="
              isFileSelected
                ? `background-image:url('${image}');background-size:cover;border:none;`
                : ''
            "
          >
            <p v-if="!isFileSelected">ファイルを選択</p>
          </div>
          <input
            type="file"
            ref="file"
            class="attachment-input"
            @change="setImage"
          />
        </label>
      </div>
      <div style="width:100%;text-align:center;">
        <input
          type="button"
          value="Create commit"
          class="carete-commit-btn"
          @click="commit"
        />
      </div>
    </div>
    <div v-else>
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      isOK: false,
      errorMessage: "",
      isFileSelected: false,
      image: "",
      message: "",
      userData: null,
      dbUserData: null,
      projectData: null,
      username: this.$route.username,
      filetype: ""
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userData = user;
        const that = this;

        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.dbUserData = doc.data();
            }
          })
          .then(() => {
            console.log(that.$route.params.username);

            if (this.dbUserData.username == that.$route.params.username) {
              firebase
                .firestore()
                .collection("projects")
                .doc(
                  `${this.dbUserData.username}::${that.$route.params.projectName}`
                )
                .get()
                .then(doc => {
                  if (doc.exists) {
                    this.isOK = true;
                    that.projectData = doc.data();
                  } else {
                    this.isOK = false;
                    this.errorMessage = "Project not found";
                  }
                });
            } else {
              this.isOK = false;
              this.errorMessage = "This is not yours.";
            }
          });
      } else {
        this.isOK = false;
        this.errorMessage = "Not logged In";
      }
    });
  },
  methods: {
    setImage(e) {
      const reader = new FileReader();
      const file = this.$refs.file.files[0];
      reader.onload = () => {
        this.isFileSelected = true;
        this.image = reader.result;
      };

      const pos = file.type.lastIndexOf("/");
      this.filetype = file.type.slice(pos + 1);

      reader.readAsDataURL(file);
    },
    commit() {
      if (this.message != "") {
        let attachment = null;

        if (this.isFileSelected) {
          const storageRef = firebase.storage().ref();

          const refPath = `/attachment/${this.userData.uid}/${
            this.projectData.isPrivate ? "private" : "public"
          }/${uuidv4()}.${this.filetype}`;

          const ref = storageRef.child(refPath);

          const pos = this.image.indexOf(",");
          const base64 = this.image.slice(pos + 1);

          ref.putString(base64, "base64").then(function(snapshot) {
            console.log("Uploaded a base64 string!");
          });

          attachment = {
            type: "img",
            src: refPath
          };
        }

        const newCommit = {
          date: Math.floor(new Date().getTime() / 1000),
          message: this.message,
          attachment,
          tags: [],
          reactions: []
        };

        this.projectData.commits.push(newCommit);

        const that = this;

        firebase
          .firestore()
          .collection("projects")
          .doc(`${this.dbUserData.username}::${this.projectData.name}`)
          .set(this.projectData)
          .then(() => {
            that.$router.push(
              `/${that.dbUserData.username}/${that.projectData.name}`
            );
          });
      }
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

.content {
  width: 300px;
  align-items: left;
  justify-content: left;
  text-align: left;
}

.commit-message {
  border: none;
  border-bottom: solid 0.5px #333333;
  font-size: 20px;
  transition: 0.2s;
  font-weight: 100;
}

.commit-message:focus {
  border-bottom: solid 1px #333333;
}

.attachment h3 {
  margin-top: 30px;
  font-size: 20px;
  font-weight: 200;
}

.attachment-file {
  width: 100%;
  height: 200px;
  border-radius: 20px;
  border: dashed 1px #333333;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
}

.attachment-input {
  display: none;
}

.carete-commit-btn {
  margin-top: 40px;
  font-size: 20px;
  border-radius: 20px;
  border: none;
  padding: 5px;
  font-weight: bold;
  padding-right: 30px;
  padding-left: 30px;
  background-color: #156a25;
  color: #ffffff;
}
</style>
