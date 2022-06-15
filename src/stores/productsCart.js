import { defineStore } from 'pinia'
import axios from "axios"

export const useProductsStore = defineStore({
  id: 'productsCart',
  state: () => ({
    productsCart: []
  }),
  getters: {
   getProductsCart(state) {
     return state.productsCart
   }
  },
  actions: {
    async fetchProductsCart() {
      try {
        const endpoint = "http://38.242.229.113:8055/graphql/system";
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const graphqlQuery = {

        query: 
          `query {
            users_me {
              carts {
                products_id {
                  title
                  description
                  price
                  image {
                    id
                  }
                }
              }
            }
          }
          `
        ,
        variables: {},
      };

      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(graphqlQuery),
      };

      const response = await fetch(endpoint, options);
      const data = await response.json();
      console.log(data.data);
      this.productsCart.push (data.data)
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
    }
  },
})
