import { Request, Response } from 'express';
import {getManager} from 'typeorm';
import {validate} from 'class-validator';
import {Book} from '../entities/Book';
import {User} from "../entities/User";
import {Lending} from "../entities/Lending";
import {Config} from "../entities/Config";

export const createLending = async (req: Request, res: Response): Promise<Response> => {
    try {
        const lending = new Lending();

        const entityManger = getManager();
        lending.user = await entityManger.findOne(User, req.body.userId) || null;
        lending.book = await entityManger.findOne(Book, req.body.bookId) || null;

        if (lending.book?.stock && lending.book?.stock > 0) {
            const config = await entityManger.findOne(Config, 1) || null;
            if (config) {
                lending.lent_at = new Date();
                lending.due_to = new Date(lending.lent_at.valueOf());
                lending.due_to.setDate(lending.due_to.getDate() + config.lending_duration);
            }
        }

        const errors = await validate(lending, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        await entityManger.save(Lending, lending);

        return res.status(201).json(lending);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

// export const finishLending = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const lending = new Lending();
//
//         const entityManger = getManager();
//         lending.user = await entityManger.findOne(User, req.body.userId) || null;
//         lending.book = await entityManger.findOne(Book, req.body.bookId) || null;
//
//         const errors = await validate(lending, { skipMissingProperties: true });
//         if (errors.length > 0) { return res.status(422).json(errors); }
//
//         await entityManger.save(Review, lending);
//
//         return res.status(201).json(lending);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).json('Internal server error');
//     }
// }

// export const listLendings = async (req: Request, res: Response): Promise<Response> => {
//     const entityManger = getManager();
//     const filters: Record<string,any> = {};
//
//     if (req.query.userId) filters.userId = req.query.userId;
//     if (req.query.bookId) filters.bookId = req.query.bookId;
//
//     let books = await entityManger.find(Review, filters);
//     return res.status(200).json(books);
// }

export const getLending = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const lending = await entityManger.findOne(Lending, req.params.id);

    return res.status(200).json(lending);
}
