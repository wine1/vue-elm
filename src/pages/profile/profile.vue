<template>
  <div id="profile">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section class="profile-number">
            <router-link :to="userInfo&&userInfo.user_id? '/profile/info':'/login'" class="profile-link">
                <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id" alt="">
            
            </router-link>

        </section>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>