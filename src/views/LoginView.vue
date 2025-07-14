<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/LoginView.css'

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()

function doLogin(e: Event) {
    e.preventDefault()

    if (email.value == '' || password.value == '') return

    MainService.login(email.value, password.value)
        .then(rsp => {
            AuthService.createAuth(rsp.data)
            router.push('/')
        })
        .catch(e=>alert('failed to login, check your email or password'))
}


</script>

<template>
    <Navigation/>
    <div class="auth-form-login-outside">
        <div class="auth-form-login">
        <form v-on:submit="e => doLogin(e)">
            <h1>Login</h1>
            <div class="input-box">
                <input type="email" placeholder="Email" id="email" v-model="email">
                <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Password" id="password" v-model="password">
                <i class="fa-solid fa-lock"></i>
            </div>
            <button type="submit" class="btn">Login</button>
            <div class="register-link">
                <p>Don't have an account? <RouterLink class="RouterRegisterLink" to="/register">Register</RouterLink></p>
            </div>
        </form>
    </div>
    </div>
</template>

