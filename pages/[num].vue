<script setup lang="ts">
import { } from '#app';

const route = useRoute();
const num: number = +route.params.num;
interface PhotoObject {
  id: string;
  user: object;
  urls: object
}

const summary = useSummary();

const photos = ref<PhotoObject[]>([]);

const changeSummary = (price: number, sign: boolean) => {
  if (sign) {
    summary.value += price;
  } else {
    summary.value -= price;
  }

}

onBeforeMount(() => {
  fetch(`https://api.unsplash.com/photos/?client_id=uRrndArepKUvQ7vi9JY1hdpaEtECBXzPKexK8vGDc-w&page=${num}&per_page=8`)
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
          <span v-show="num - 1 > 1" class="page-link">...</span>
          <NuxtLink v-show="num - 1 > 1" class="page-link" :to="`/${num - 1}`">{{ num - 1 }}</NuxtLink>
          <NuxtLink class="page-link" :to="`/${num}`">{{ num }}</NuxtLink>
          <NuxtLink v-show="10 - num > 1" class="page-link" :to="`/${num + 1}`">{{ num + 1 }}</NuxtLink>
          <span v-show="10 - num > 1" class="page-link">...</span>
          <NuxtLink v-show="num !== 10" class="page-link" to="/10">10</NuxtLink>
        </nav>
        <p class="cart">{{ summary.toLocaleString() + ' руб.' }}</p>
      </div>
    </footer>

  </div>
</template>

