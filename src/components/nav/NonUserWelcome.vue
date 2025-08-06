<template>
  <div class="flex flex-center text-secondary">
    <div class="q-ma-lg text-h2 goldman-bold text-primary">Track Em' All!!</div>
    <div class="q-pa-md text-body1 blurb">
      <div class="intro">
        Welcome to PTCGP Tracker! Keep track of all cards you've collected in
        the mobile game Pokemon Trading Card Game Pocket. I created this site
        because I wanted to know how many cards I had missing per pack in a set,
        so I knew which packs to focus on opening.
      </div>

      <div class="features q-mt-lg">
        <p class="text-primary text-h6">Features:</p>
        <ul>
          <li>Keep track of quantity of each card organized by sets</li>
          <li>
            See at a glance how many cards you are missing per set and pack
          </li>
          <li>View all cards available</li>
          <li>Create and customize decks</li>
        </ul>
      </div>
      <div class="future-features q-mt-lg">
        <p class="text-primary text-h6">Upcoming Features:</p>
        <ul>
          <li>
            Create deck templates to see which cards you are missing to make a
            certain deck
          </li>
          <li>And more!!</li>
        </ul>
      </div>
      <div class="future-features-cont q-mt-lg">
        <p>
          This is a fun little side project for me, so I will constantly be
          adding new things to it. Let me know if there are any features you
          want to see added in the future!
        </p>
      </div>
      <q-btn
        class="q-mx-auto q-my-lg"
        style="display: block"
        text-color="secondary"
        color="accent"
        label="Sign up"
        @click="onSignupClick"
      />
    </div>
  </div>
</template>
<script setup>
/* imports */
import { useRouter } from 'vue-router';

const router = useRouter();

function onSignupClick() {
  router.push('/login');
}
</script>
<style lang="scss" scoped>
.blurb {
  max-width: 80%;
  border-radius: 15px;
  border: 3px dotted $primary;
}
</style>
