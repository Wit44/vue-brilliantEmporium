<script lang="ts" setup>
import { ref } from 'vue'
import type { BookModel } from "@/models/book.model";
import { BookService } from '@/services/book.service';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/auth.service';
import { useLogout } from '@/hooks/logout.hook';
import { formatTime } from '@/utils';
import Navigation from '@/components/Navigation.vue';



const logout = useLogout()

const username = AuthService.getUser()

const books = ref<BookModel[]>()
const allBooks = ref<BookModel[]>()
BookService.getBooks()
    .then(rsp => {
        books.value = rsp.data
        allBooks.value = rsp.data})
    .catch(e => logout(e))

async function doDelete(book: BookModel){
    try {
        if(!confirm(`Are you sure you want to delete ${book.title}?`)) return
        await BookService.deleteBook(book.bookId)
        books.value = books.value?.filter(b => b.bookId !== book.bookId)
    } catch (e) {
        logout(e)
    }
}

function doSearch(e: any) {
    if (allBooks.value == undefined) return

    const input = e.target.value ? e.target.value.toLowerCase() : ''

    if (input == '') {
        books.value = allBooks.value
    }

    books.value = allBooks.value.filter(b => {
        return b.author.toLocaleLowerCase().includes(input) || b.genre.toLocaleLowerCase().includes(input) || b.title.toLocaleLowerCase().includes(input) || b.price.toLocaleLowerCase().includes(input)
    })
}
</script>


<template>
    <Navigation/>
    <div class="input-group mb-3 search">
        <span class="input-group-text" id="search">
            <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input type="text" class="form-control" aria-describedby="search" placeholder="Title, Author, Genre... 🔍"
            @keyup="(e) => doSearch(e)">
    </div>
    <div>
        <h3>Library</h3>
        <RouterLink to="/book/new" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-plus"></i> Add a book
        </RouterLink>
    </div>
    <table class="table table-striped table-hover" v-if="books">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Price</th>
                <th scope="col">Author</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="b of books" :key="b.bookId">
                <th scope="row">{{ b.bookId }}</th>
                <td>{{ b.title }}</td>
                <td>{{ b.genre }}</td>
                <td>{{ b.price }}</td>
                <td>{{ b.author }}</td>
                <td>{{ formatTime(b.updatedAt ?? b.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/book/${b.bookId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" v-if="username === 'admin@admin.com'" @click="doDelete(b)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>