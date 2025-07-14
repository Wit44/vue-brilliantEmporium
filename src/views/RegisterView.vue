<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/RegisterView.css'

const name = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const router = useRouter();

function doRegister(e: Event) {
    e.preventDefault();

    if (!name.value || !email.value || !password.value) return;

    MainService.register(name.value, email.value, password.value)
        .then(rsp => {
            AuthService.createAuth(rsp.data);
            router.push('/');
        })
        .catch(err => {
            alert('Failed to register. The email may already be taken.');
        });
}
</script>

<template>
  <Navigation />
  <div class="auth-form-registration-outside">
    <div class="auth-form-registration">
    <form v-on:submit="e => doRegister(e)">
        <h1>Register</h1>
      <div class="input-box">
        <input type="text" placeholder="Name" id="name" v-model="name" />
        <i class="fa-solid fa-user"></i>
      </div>
      <div class="input-box">
        <input type="email" placeholder="Email" id="email" v-model="email" />
        <i class="fa-solid fa-envelope"></i>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Password" id="password" v-model="password" />
        <i class="fa-solid fa-lock"></i>
      </div>
      <button type="submit" class="btn">Register</button>
    </form>
  </div>
  </div>
  
</template>
