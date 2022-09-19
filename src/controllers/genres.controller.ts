import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Genre} from "../entities/Genre";

export const listGenres = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    let genres = await entityManger.find(Genre);
    return res.status(200).json(genres);
}