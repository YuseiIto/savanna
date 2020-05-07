<template>
  <v-container>
    <v-col align="center" justify="center">
      <nuxt-link to="/signIn" class="signInLink">
        <span style="color: #ffffff;">Sign In</span>
      </nuxt-link>
    </v-col>
  </v-container>
</template>
<style>
.signInLink {
  text-decoration: none;
  background-color: #467010;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  transition: 0.5s;
}

.signInLink:hover {
  background-color: #467010bb;
}
</style>
