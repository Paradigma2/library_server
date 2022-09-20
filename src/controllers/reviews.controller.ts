import { Request, Response } from 'express';
import {getManager} from 'typeorm';
import {validate} from 'class-validator';
import {Book} from '../entities/Book';
import {Review} from "../entities/Review";
import {User} from "../entities/User";

export const createReview = async (req: Request, res: Response): Promise<Response> => {
    try {
        const review = new Review();

        review.comment = req.body.comment;
        review.score = req.body.score;

        const entityManger = getManager();
        review.user = await entityManger.findOne(User, req.body.userId) || null;
        review.book = await entityManger.findOne(Book, req.body.bookId) || null;

        const errors = await validate(review, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        await entityManger.save(Review, review);
        const { avg } = await entityManger
            .createQueryBuilder(Book, "book")
            .leftJoinAndSelect('book.reviews', 'reviews')
            .where('book.id = :bookId', { bookId: req.body.bookId })
            .select("AVG(reviews.score)", "avg")
            .getRawOne();

        if (review.book && avg) review.book.averageScore = avg;
        // @ts-ignore
        await entityManger.save(Book, review.book);

        return res.status(201).json(review);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const listReviews = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const filters: Record<string,any> = {};

    if (req.query.userId) filters.user = req.query.userId;
    if (req.query.bookId) filters.book = req.query.bookId;

    let books = await entityManger.find(Review, filters);
    return res.status(200).json(books);
}

export const updateReview  = async (req: Request, res: Response): Promise<Response> =>{
    const entityManger = getManager();
    let review = await entityManger.findOne(Review, req.params.id);

    if (review) {
        if (req.body.comment) review.comment = req.body.comment;
        if (req.body.score) review.score = req.body.score;

        await entityManger.save(Review, review);
        return res.status(200).json(review);
    } else {
        return res.status(404).json(review);
    }
}

export const getReview = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const review = await entityManger.findOne(Review, req.params.id);

    return res.status(200).json(review);
}
