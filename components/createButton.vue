<template>
  <div class="create-button-wrapper">
    <nuxt-link :to="to">
      <a class="new-project">{{ label }}</a>
    </nuxt-link>
  </div>
</template>
<script>
export default {
  props: ["label", "to"]
};
</script>
<style>
.new-project {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  padding: 10px;
  background-color: #0095f6;
  border-radius: 5px;
  padding-left: 70px;
  padding-right: 70px;
  transition: 0.7s;
  box-shadow: 4px 3px 9px -4px #727272;
}

.new-project:hover {
  color: #ffffff;
  background-color: #0095f6bb;
}

.create-button-wrapper {
  margin-bottom: 70px;
  margin-top: 40px;
}
</style>
