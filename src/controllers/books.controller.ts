import { Request, Response } from 'express';
import {getManager, LessThanOrEqual, MoreThanOrEqual} from 'typeorm';
import {validate} from 'class-validator';
import {Book, BookStatus} from '../entities/Book';
import {Photo} from '../entities/Photo';
import {Genre} from "../entities/Genre";

export const createBook = async (req: Request, res: Response): Promise<Response> => {
    try {
        const book = new Book();

        book.title = req.body.title;
        book.status = req.body.status || BookStatus.REQUESTED;
        book.publisher = req.body.publisher;
        book.year = req.body.year;
        book.language = req.body.language;
        book.authors = req.body.authors;

        const entityManger = getManager();
        book.photo = await entityManger.findOne(Photo, req.body.photoId) || null;

        let genres: Genre[] = [];
        for (const genreId of req.body.genres) {
            let genre = await entityManger.findOne(Genre, genreId) || null;
            if (genre) genres.push(genre);
        }
        book.genres = genres;

        const errors = await validate(book, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        await entityManger.save(Book, book);

        return res.status(201).json(book);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const listBooks = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const filters: Record<string,any> = {};
    // TODO: add partial search by title and authors
    if (req.query.publisher) filters.publisher = req.query.publisher;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.from) filters.year = MoreThanOrEqual(req.query.from);
    if (req.query.to) filters.year = LessThanOrEqual(req.query.to);

    let books = await entityManger.find(Book, filters);
    return res.status(200).json(books);
}

export const updateBook  = async (req: Request, res: Response): Promise<Response> =>{
    const entityManger = getManager();
    let book = await entityManger.findOne(Book, req.params.id);

    if (book) {
        if (req.body.title) book.title = req.body.title;
        if (req.body.status) book.status = req.body.status;
        if (req.body.publisher) book.publisher = req.body.publisher;
        if (req.body.year) book.year = req.body.year;
        if (req.body.language) book.language = req.body.language;
        if (req.body.authors) book.authors = req.body.authors;
        if (req.body.photoId) book.photo = await entityManger.findOne(Photo, req.body.photoId) || null;

        let genres: Genre[] = [];
        for (const genreId of req.body.genres) {
            let genre = await entityManger.findOne(Genre, genreId) || null;
            if (genre) genres.push(genre);
        }
        book.genres = genres;

        await entityManger.save(Book, book);
        return res.status(200).json(book);
    } else {
        return res.status(404).json(book);
    }
}

export const getBook = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const book = await entityManger.findOne(Book, req.params.id);

    return res.status(200).json(book);
}