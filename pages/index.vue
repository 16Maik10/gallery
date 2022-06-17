<script setup lang="ts">

import { } from "#app"
import { log } from "console";

const summary = useSummary();

interface PhotoObject {
  id: string;
  user: object;
  urls: object
}


const photos = ref<PhotoObject[]>([]);

const changeSummary = (price: number, sign: boolean) => {
  if (sign) {
    summary.value += price;
  } else {
    summary.value -= price;
  }

}

onBeforeMount(() => {
  fetch('https://api.unsplash.com/photos/?client_id=uRrndArepKUvQ7vi9JY1hdpaEtECBXzPKexK8vGDc-w&page=1&per_page=8')
    .then(res => res.json())
    .then(data => {
      photos.value = data;
    })
    .catch(error => console.log(error))
})

</script>

<template>
  <div>
    <div class="cards-container">
      <Photocard v-for="photo in photos" :key="photo.id" :photo="photo" @change-count="changeSummary" />
    </div>
    <footer class="footer">
      <div class="footer__content">
        <nav class="pagination">
          <NuxtLink class="page-link" to="/">1</NuxtLink>
          <NuxtLink class="page-link" to="/2">2</NuxtLink>
          <NuxtLink class="page-link" to="/3">3</NuxtLink>
          <span class="page-link">...</span>
          <NuxtLink class="page-link" to="/10">10</NuxtLink>
        </nav>
        <p class="cart">{{ summary.toLocaleString() + ' руб.' }}</p>
      </div>
    </footer>

  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');

* {
  font-family: 'Roboto Condensed', sans-serif;
  margin: 0;
  padding: 0;
}

.cards-container {
  margin: 0 auto;
}

.footer {
  height: 60px;
  width: 100vw;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff;
  position: fixed;
  bottom: 0;
  box-sizing: border-box;

  &__content {
    max-width: 660px;
    position: relative;
    margin: 0 auto;
  }
}

.pagination {
  padding-left: 25px;
  margin: 0 auto 0 0;
  width: fit-content;
}

.page-link {
  font-weight: 400;
  font-size: 14px;
  color: #fff;
  text-decoration: none;
  margin: 0 5px;
}

a.page-link {
  &:first-of-type {
    margin: 0 5px 0 0;
  }

  &:last-of-type {
    margin: 0 0 0 5px;
  }
}

.router-link-active {
  font-size: 18px;
  font-weight: 800;
}

.cart {
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;

  &::after {
    content: "";
    display: block;
    height: 25px;
    width: 25px;
    background: url(./assets/cart.svg) no-repeat center/cover;
    margin-left: 0.5rem;
  }
}

@media screen and (min-width: 480px) {

  .cards-container {
    width: 92vw;
  }

  .pagination {
    margin: 0 auto;
    padding-left: 0;
  }
}

@media screen and (min-width: 768px) {

  .cards-container {
    width: 86vw;
    max-width: 660px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

}
</style>