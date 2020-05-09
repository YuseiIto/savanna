<template>
  <div class="user-header-container">
    <div class="avatar" :style="`background-image:url('${dbUser==null?'':dbUser.photoURL}')`"></div>
    <div style="display:flex; flex-direction:column; text-align:left;">
      <h3 class="displayName">{{ dbUser == null ? "" : dbUser.name }}</h3>
      <h3>@{{ dbUser == null ? "" : dbUser.username }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dbUser"]
};
</script>
<style>
.user-header-container {
  display: flex;
  flex-direction: row;
  width: 300px;
  padding: 30px;
}
.avatar {
  border-radius: 70px;
  height: 70px;
  width: 70px;
  background-size: cover;
  margin-right: 20px;
}

.displayName {
  font-weight: bold;
  font-size: 30px;
}
</style>
