<template>
  <div style="width:500px;">
    <ul>
      <li v-for="project in projects" :key="project.name" class="project-container">
        <div style="text-align:left;">
          <nuxt-link :to="`/${$route.params.username}/${project.name}`">
            <h3
              class="title is-6"
              style="margin-bottom:10px;border-bottom:1px solid #333333; padding-bottom:5px;"
            >{{project.name}}</h3>
          </nuxt-link>
          <p>{{project.description}}</p>
        </div>

        <savannah :projectData="project" />
      </li>
    </ul>
  </div>
</template>
<script>
import savannah from "./savannah";
export default {
  props: ["projects"],
  components: {
    savannah
  },
  mounted() {
    console.log(this.projects);
  }
};
</script>
<style>
.project-container {
  margin-top: 30px;
}
</style>
