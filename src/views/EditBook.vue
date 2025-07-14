<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import '@/assets/EditBook.css'

const logout = useLogout()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const book = ref<BookModel>()

BookService.getBookById(id)
    .then(rsp => book.value = rsp.data)
    .catch(e => logout(e))

function doUpdate() {
    BookService.updateBook(id, book.value)
    .then(rsp => router.push('/book'))
    .catch(e => logout(e))
}
</script>

<template>
    <Navigation/>
    <div class="custom-form" v-if="book">
        <h1>Edit Book</h1>
        <form v-on:submit.prevent="doUpdate">
            <div class="mb-3">
                <label for="id" class="form-label">ID:</label>
                <input type="number" class="form-control" id="id" :value="book.bookId" disabled>
            </div>
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
                <input type="text" class="form-control" id="price" v-model="book.price">
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Author:</label>
                <input type="text" class="form-control" id="author" v-model="book.author">
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Updated At:</label>
                <input type="text" class="form-control" id="updated" :value="formatTime(book.updatedAt ?? book.createdAt)" disabled>
            </div>
            <button class="btnSaveBook">
                <p><i class="fa-solid fa-floppy-disk"></i> Save</p>
            </button>
        </form>
    </div>
</template>