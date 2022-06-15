<template>
  <div>
    <div>
      <input type="text" name="first" placeholder="Write your name" />
      <input type="text" name="last" placeholder="Write your last name" />
      <input type="email" name="email" placeholder="Write your email" />
      <input
        type="password"
        name="password"
        placeholder="Write your password"
      />
      <button @click="createUser">Завершить регистрацию</button>
    </div>
    <div>
      <input
        type="email"
        name="auth_email"
        value="a@example.com"
        placeholder="Write your email"
      />
      <input
        type="password"
        name="auth_password"
        value="123"
        placeholder="Write your password"
      />
      <button @click="getAuth">Войти</button>
    </div>
    <p>{{ me_email }}</p>
    <p>{{ me_id }}</p>
    <button @click="user_me">click</button>
    <button @click="logOut">выйти</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";

export default {
  setup() {
    const me_email = ref('') 
    const me_id = ref('')

    
    async function user_me () {
       const { data } = await axios.get("http://38.242.229.113:8055/users/me", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(data);
      me_email.value = data.data.email
      me_id.value = data.data.id
    }


    async function getAuth() {
      const password = document.querySelector(
        "input[name=auth_password]"
      ).value;
      const email = document.querySelector("input[name=auth_email]").value;
      const data = { email: email, password: password };
      const result = await axios.post(
        "http://38.242.229.113:8055/auth/login",
        data
      );
      localStorage.setItem("token", result.data.data.access_token);
    }
    async function createUser() {
      const first = document.querySelector("input[name=first]").value;
      const last = document.querySelector("input[name=last]").value;
      const email = document.querySelector("input[name=email]").value;
      const password = document.querySelector("input[name=password]").value;
      const data = {
        first_name: first,
        last_name: last,
        email: email,
        password: password,
      };
      axios
        .post("http://38.242.229.113:8055/users", data)
        .then(alert("Успешно зарегистрировались"));
    }
    function logOut() {
      localStorage.clear()
    }
    return {
      getAuth,
      createUser,
      user_me,
      me_email,
      me_id,
      logOut
    };
  },
};
</script>

<style></style>

cf49ed74-e9df-451d-ae3a-9a77c07fcf7a
