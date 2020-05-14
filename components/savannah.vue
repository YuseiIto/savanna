<template>
  <canvas width="7000" height="1000" class="canvas"></canvas>
</template>
<script>
export default {
  props: ["projectData"],
  data() {
    return { ctx: null, dataArr: [] };
  },
  methods: {
    formDataArr() {
      const base = new Date();
      base.setHours(0);
      base.setMinutes(0);
      base.setSeconds(0);
      base.setDate(base.getDate() - 365);

      const buf = [];

      for (let i = 0; i < 365; i++) {
        buf.push(0);
      }

      this.projectData.commits.forEach(commit => {
        const commitDay = new Date(commit.date * 1000);
        commitDay.setHours(0);
        commitDay.setMinutes(0);
        commitDay.setSeconds(0);

        const diff = commitDay - base;

        const index = Math.floor(diff / (1000 * 60 * 60 * 24));

        buf[index]++;
      });

      this.dataArr = buf;
    },
    draw() {
      const ctx = this.ctx;
      const offset = new Date().getDay();

      for (let i = offset; i < 365 + offset; i++) {
        ctx.fillStyle = "rgb(200, 200, 200)";

        if (this.dataArr[i - offset] > 0) {
          ctx.fillStyle = "#156A25";
        }

        ctx.fillRect(Math.floor(i / 7) * 130, (i % 7) * 130, 100, 100);
      }
    }
  },
  mounted() {
    this.ctx = this.$el.getContext("2d");
    this.formDataArr();
    this.draw();
  }
};
</script>
<style>
.canvas {
  width: 100%;
}
</style>
