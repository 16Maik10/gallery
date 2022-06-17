<script setup lang="ts">
const props = defineProps({
  photo: Object
})

const emit = defineEmits(['changeCount']);

const cards = useCards();

onBeforeMount(() => {
  if (!cards.value.hasOwnProperty(props.photo.id)) {
    cards.value[props.photo.id] = {};
    cards.value[props.photo.id].count = 0;
    cards.value[props.photo.id].price = Math.ceil((Math.random() * 59000) + 1000);
  }
})

const add = () => {
  cards.value[props.photo.id].count++;
  emit('changeCount', cards.value[props.photo.id].price, true);
}

const remove = () => {
  cards.value[props.photo.id].count--;
  emit('changeCount', cards.value[props.photo.id].price, false);
}
</script>

<template>
  <div class="card">
    <div class="card__header">
      <a :href="props.photo.user.links.html" target="_blank"
        :style="{ background: `url(${props.photo.user.profile_image.medium}) no-repeat center/cover` }" />
      <div class="card__userInfo">
        <p class="card__authorName">{{ props.photo.user.first_name + ' ' + (props.photo.user.last_name || '') }}</p>
        <p class="card__authorNick">{{ '@' + props.photo.user.username }}</p>
      </div>
    </div>
    <img class="card__img" :src="props.photo.urls.regular" alt="Photo">
    <div class="card__buy">
      <div class="card__actions">
        <button @click="add" class="card__add cardAction" />
        <button @click="remove" :disabled="cards[props.photo.id].count === 0" class="card__remove cardAction" />
      </div>
      <div class="card__views">
        <p class="card__count">{{ cards[props.photo.id].count }}</p>
        <p class="card__price">{{ cards[props.photo.id].price.toLocaleString() + ' руб.' }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  margin-bottom: 10px;

  &__img {
    width: 100%;
    height: 230px;
    object-fit: cover;
  }

  &:last-of-type {
    margin-bottom: 60px;
  }

  &__header {
    padding: 0.63rem;
    display: flex;
    height: 30px;

    &>a {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 100%;
    }
  }

  &__userInfo {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #333;
    margin-left: 10px;
  }

  &__authorNick {
    font-weight: 400;
    color: #8D8D8D;
  }

  &__buy {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.64rem;
  }

  &__actions {
    display: flex;
  }

  &Action {
    width: 17px;
    height: 17px;
    border: none;
    margin-right: 2px;
    cursor: pointer;
  }

  &__add {
    background: url(./assets/plus.svg) no-repeat center/cover;
  }

  &__remove {
    width: 9px;
    background: url(./assets/minus.svg) no-repeat center/cover;
    margin-left: 2px;
  }

  &__count {
    font-weight: 700;
    font-size: 10px;
    line-height: 140%;
    color: #333333;
    margin-left: 10px;
  }

  &__views {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__price {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #333333;
  }
}

@media screen and (min-width: 480px) {

  .card__img {
    height: 300px;
  }
}

@media screen and (min-width: 768px) {

  .card {
    width: fit-content;

    &__img {
      height: 230px;
      width: 320px;
    }
  }
}
</style>