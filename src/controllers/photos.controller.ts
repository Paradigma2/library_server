import { Request, Response } from 'express';
import {getManager} from 'typeorm';
import {validate} from 'class-validator';
import {Photo} from '../entities/Photo';

export const createPhoto = async (req: Request, res: Response): Promise<Response> => {
    try {
        const entityManger = getManager();
        const photo = new Photo();

        photo.filename = req.file?.filename;

        const errors = await validate(photo, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        await entityManger.save(Photo, photo);

        return res.status(201).json(photo);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const getPhoto = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const photo = await entityManger.findOne(Photo, req.params.id);

    return res.status(200).json(photo);
}
