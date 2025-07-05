<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { BookService } from '@/services/book.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const logout = useLogout()
const router = useRouter()
const book = ref({
    title: '',
    genre: '',
    price: '',
    author: ''
})

function doCreate() {
    BookService.createBook(book.value)
        .then(rsp => router.push('/book'))
        .catch(e => logout(e))
}

</script>

<template>
    <Navigation/>

    <div class="custom-form" v-if="book">
        <h1>Create Book</h1>
        <form v-on:submit.prevent="doCreate">
            <div class="mb-3">
                <label for="title" class="form-label">Title:</label>
                <input type="text" class="form-control" id="title" v-model="book.title">
            </div>
            <div class="mb-3">
                <label for="genre" class="form-label">Genre:</label>
                <input type="text" class="form-control" id="genre" v-model="book.genre">
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price:</label>
                <input type="text" class="form-control" id="Price" v-model="book.price">
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Author:</label>
                <input type="text" class="form-control" id="author" v-model="book.author">
            </div>
            <button class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>

</template>