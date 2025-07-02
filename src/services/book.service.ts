import type { BookModel } from "@/models/book.model";
import { MainService } from "./main.service";

export class BookService {
    static async getBooks(){
        return await MainService.useAxios<BookModel[]>('/book')
    }

    static async getBookById(id: number){
        return await MainService.useAxios<BookModel>(`/book/${id}`)
    }

    static async createBook(model:any) {
        return await MainService.useAxios('/book', 'post', model)
    }

    static async updateBook(id: number, model:any){
        return await MainService.useAxios(`/book/${id}`, 'put', model)
    }

    static async deleteBook(id:number) {
        return await MainService.useAxios(`/book/${id}`, 'delete')
    }
}