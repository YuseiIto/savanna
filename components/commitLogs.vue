<template>
  <div>
    <h3 class="recent-activity">Recent Activity</h3>
    <table class="commit-logs-tbl">
      <div class="month" v-for="(month, mIndex) in model" :key="mIndex">
        <tr>
          <td class="month-label">{{ month.label }}</td>
        </tr>
        <tr v-for="(day, dIndex) in month.days" :key="dIndex" class="day">
          <td class="day-label">{{ day.label }}</td>
          <td>
            <ul>
              <li v-for="(commit, cIndex) in day.commits" :key="cIndex">
                {{ commit.message }}
              </li>
            </ul>
          </td>
          <td v-if="day.images.length > 0" class="commit-images">
            <div
              v-for="(item, index) in day.images"
              :key="index"
              class="commit-img"
              :style="`background-image:url('${item}')`"
            >
              <!--Div box for image-->
            </div>
          </td>
        </tr>
      </div>
    </table>
  </div>
</template>
<script>
import moment from "moment";
import firebase from "~/plugins/firebase.js";

export default {
  props: ["projectData"],
  data() {
    return { model: [] };
  },
  async mounted() {
    const data = this.projectData;
    const commits = data.commits;

    if (commits.length > 0) {
      commits.sort((a, b) => {
        if (a.date < b.date) return 1;
        return -1;
      });

      commits.forEach(e => {
        e.date = moment(e.date * 1000);
      });

      console.log(commits);

      const model = [{ label: commits[0].date.format("MMM YYYY"), days: [] }];

      for (let i = 0; i < commits.length; i++) {
        let e = commits[i];

        if (e.date.format("MMM YYYY") != model[model.length - 1].label) {
          //Next Month!
          model.push({ label: e.date.format("MMM YYYY"), days: [] });
        }

        if (
          model.slice(-1)[0].days.length == 0 ||
          e.date.format("D") != model.slice(-1)[0].days.slice(-1)[0].label
        ) {
          model[model.length - 1].days.push({
            label: e.date.format("D"),
            commits: [],
            images: []
          });
        }

        model
          .slice(-1)[0]
          .days.slice(-1)[0]
          .commits.push(e);

        if (e.attachment != null && e.attachment.type == "img") {
          const refPath = e.attachment.src;

          await firebase
            .storage()
            .ref(refPath)
            .getDownloadURL()
            .then(function(url) {
              model
                .slice(-1)[0]
                .days.slice(-1)[0]
                .images.push(url);
            });
        }
      }

      console.log(model);
      this.model = model;
    }
  },

  methods: {}
};
</script>

<style>
.recent-activity {
  font-size: 30px;
  margin-top: 10px;
  font-weight: 100;
}

.commit-logs-tbl .month {
  padding-top: 20px;
  padding-bottom: 20px;
}

.month-label {
  font-size: 20px;
  padding-bottom: 10px;
}

.day td ul {
  margin-top: 5px;
  margin-bottom: 20px;
}

.day-label {
  padding: 10px;
  font-weight: bold;
  margin-right: 10px;
  justify-content: left;
  align-items: center;
}

.commit-img {
  width: 40px;
  height: 40px;
  background-size: cover;
  margin-right: 10px;
  border-radius: 5px;
}

.commit-images {
  display: flex;
}
</style>
