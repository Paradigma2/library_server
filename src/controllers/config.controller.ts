import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Config} from "../entities/Config";

export const updateConfig  = async (req: Request, res: Response): Promise<Response> =>{
    const entityManger = getManager();
    let config = await entityManger.findOne(Config, 1);

    if (config) {
        if (req.body.lending_duration) config.lending_duration = req.body.lending_duration;

        await entityManger.save(Config, config);
        return res.status(200).json(config);
    } else {
        return res.status(404).json(config);
    }
}