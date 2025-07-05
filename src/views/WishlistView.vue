<script lang="ts" setup>

import { useLogout } from '@/hooks/logout.hook';
import type { WishlistModel } from '@/models/wishlist.model';
import { WishlistService } from '@/services/wishlist.service';
import { ref } from 'vue';
import { formatTime } from '@/utils';
import Navigation from '@/components/Navigation.vue';


const wishlists = ref<WishlistModel[]>()
const logout = useLogout()
WishlistService.getWishlists()
    .then(rsp => wishlists.value = rsp.data)
    .catch(e => logout(e))


function doDelete(w: WishlistModel) {
    WishlistService.deleteWishlist(w.wishlistId)
        .then(rsp => wishlists.value = wishlists.value?.filter(wishlist => wishlist.wishlistId !== w.wishlistId))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation/>
    <div>
        <h1 class="text-center">Wishlist</h1>
    </div>
    <RouterLink to="/wishlist/new" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-plus"></i> Create wishlist
        </RouterLink>
    <table class="table table-striped table-hover" v-if="wishlists">
        <thead>
            <tr>
                <th scope="col">Wishlist ID</th>
                <th scope="col">Book ID</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Author</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="w of wishlists" :key="w.wishlistId">
                <th scope="row">{{ w.wishlistId }}</th>
                <td>{{ w.bookId}}</td>
                <td>{{ w.book.title }}</td>
                <td>{{ w.book.price }}</td>
                <td>{{ w.book.author }}</td>
                <td>{{ formatTime(w.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-sm btn-danger" @click="doDelete(w)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

</template>