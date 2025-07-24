import type { WishlistModel } from "@/models/wishlist.model";
import { MainService } from "./main.service";

export class WishlistService {
    static async getWishlists(){
        return await MainService.useAxios<WishlistModel[]>('/wishlist')
    }

    
    static async createWishlist(data: {bookId: number}) {
        return await MainService.useAxios('/wishlist','post', data);
    }

    static async getWishlistById(id: number) {
        return await MainService.useAxios<WishlistModel>(`/wishlist/${id}`)
    }

    static async deleteWishlist(id: number) {
        return await MainService.useAxios(`/wishlist/${id}`, 'delete')
    }

}