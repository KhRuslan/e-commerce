<template>
  <div>
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/products">Products</RouterLink>
    <RouterView />
  </div>
</template>

<script>
import { createClient, provideClient} from "@urql/vue";


export default {
  setup() {
    const client = createClient({
      url: "http://38.242.229.113:8055/graphql",
      fetchOptions: () => {
      let auth = 0
      const token = auth == 0 ? localStorage.getItem('token') : null
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' }
      };
    },
    });

    provideClient(client);
  },
};
</script>

<style></style>
