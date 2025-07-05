<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { WishlistService } from '@/services/wishlist.service';
import { useLogout } from '@/hooks/logout.hook';
import { useRouter } from 'vue-router';
import { ref } from 'vue';


const logout = useLogout()
const router = useRouter()
const wishlist = ref({
    bookId: ''
})


function doCreate() {
  if (!wishlist.value.bookId) {
    alert("Please enter a Book ID");
    return;
  }
  
  WishlistService.createWishlist(wishlist.value)
    .then(() => router.push('/wishlist'))
    .catch(e => logout(e));
}

</script>

<template>
  <Navigation/>

  <div class="custom-form">
    <h1>Add Book to Wishlist</h1>
    <form @submit.prevent="doCreate">
      <div class="mb-3">
        <label for="bookId" class="form-label">Book ID:</label>
        <input
          type="number"
          class="form-control"
          id="bookId"
          v-model.number="wishlist.bookId"
          placeholder="Enter Book ID"
        />
      </div>
      <button class="btn btn-primary">
        <i class="fa-solid fa-plus"></i> Add to Wishlist
      </button>
    </form>
  </div>
</template>