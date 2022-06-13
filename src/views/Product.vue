<template>
  <div>
    <div v-if="fetching">Loading...</div>
    <div v-else-if="error">Oh no... {{ error }}</div>
    <div v-else>
      <div v-if="data">
        <div>
          <h2>{{ data.products_by_id.title }}</h2>
          <p>{{ data.products_by_id.price }}</p>
          <p>{{ data.products_by_id.spec }}</p>
          <p>{{ data.products_by_id.description }}</p>
          <img :src="'http://38.242.229.113:8055/assets/' + data.products_by_id.image.id" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuery } from "@urql/vue";
import { useRouter, useRoute } from 'vue-router'
let log = "lo"
export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const id = +route.params.id;
    const result = useQuery({
      query: `
        query getProduct($id: ID!) {
          products_by_id(id: $id) {
            id
            title
            price
            spec
            description
            image {
              id
            }
          }
        }
      `, variables: { id },
    });
    return {
      fetching: result.fetching,
      data: result.data,
      error: result.error,
      route
    }
  },
};
</script>

<style>
</style>