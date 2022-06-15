<template>
  <div>
      
   <!--  <div v-for="p in productsCart[0]?.users_me?.carts?.products_id" :key="p.id">
    <p>{{ p }}</p>
    </div> -->
    <p>{{ productsCart[0]?.users_me.carts.products_id }}</p>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useProductsStore } from "../stores/productsCart";
import { onMounted } from "vue";
export default {
  setup() {
    const store = useProductsStore();
    const getProducts = store.getProductsCart;
    const productsCart = store.productsCart;
    onMounted(() => {
      store.fetchProductsCart();
    });

    return {
      getProducts,
      productsCart,
    };
  },
};
</script>

<style></style>
