<template>
  <img
    src="/googleSignIn.png"
    class="google-signin-button"
    @click="$emit('click')"
  />
</template>
<style>
.google-signin-button {
  width: 250px;
}
</style>
