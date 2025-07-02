export interface WishlistModel {
    wishlistId: number
    bookId: number
    createdAt: string
    book: {
        bookId: number,
        title: string,
        author: string,
        price: string,
    }
}