export interface BookSummaryDto
{
    id: number;
    bookName: string;
    author: string;
    imageUrl: string;
}

export interface CategoryWithBooksDto 
{
    categoryId: number;
    categoryName: string;
    books: BookSummaryDto[];
}

export interface BookDetailDto 
{
    id: number;
    bookName: string;
    bookDescription: string;
    author: string;
    imageUrl: string;
    seriesName?: string;
    SeriesPart?: number;
    category: string;
    languages: string[];
}

export interface Book {
    id: number;
    bookName: string;
    author: string;
    imageUrl: string;
}

export interface GroupedBooks {
    listType: string;
    books: Book[];
}