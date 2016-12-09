import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { IBook } from "../../interfaces/books/ibook";
import { BookService } from "../../services/books/books.service";

@Component({
    selector: "book-list",
    templateUrl: "./app/components/book-list/book-list.component.html"
})
export class BookListComponent implements OnInit {
    bookList: IBook[];

    async ngOnInit() {
        let id = parseInt(this.route.snapshot.params['id']);
        this.bookList = await this.bookService.getPageBooks(id);
    }

    async onSelectNext() {
        let id = parseInt(this.route.snapshot.params['id']) + 1;
        this.bookList = await this.bookService.getPageBooks(id);
        this.router.navigate(['/archive', id]);
    }

    constructor(private bookService: BookService,
        private route: ActivatedRoute,
        private router: Router) {
    }
}
