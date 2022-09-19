import {Request, Response} from 'express';
import {getManager, LessThanOrEqual, MoreThanOrEqual} from 'typeorm';
import {validate} from 'class-validator';
import {User, UserRole, UserStatus} from '../entities/User';
import {Photo} from "../entities/Photo";

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = new User();

        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.role = req.body.role || UserRole.READER;
        user.status = req.body.status || UserStatus.PENDING;

        const entityManger = getManager();
        user.photo = await entityManger.findOne(Photo, req.body.photoId) || null;

        const errors = await validate(user, { skipMissingProperties: true });
        if (errors.length > 0) { return res.status(422).json(errors); }

        await entityManger.save(User, user);

        return res.status(201).json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json('Internal server error');
    }
}

export const authenticate = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const user = await entityManger
        .createQueryBuilder(User, "user")
        .where("user.username = :username", { username: req.body.username })
        .andWhere("user.password = :password", { password: req.body.password })
        .andWhere("user.status = :status", { status: UserStatus.REGISTERED })
        .andWhere("user.role != :role", { role: UserRole.ADMIN })
        .getOne();

    if (user) return res.status(200).json(user);
    else return res.status(404).json(user);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    let user = await entityManger.findOne(User, req.params.id);

    if (user) {
        if (req.body.username) user.username = req.body.username;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.phone) user.phone = req.body.phone;
        if (req.body.address) user.phone = req.body.address;
        if (req.body.status) user.status = req.body.status;
        if (req.body.role) user.role = req.body.role;
        if (req.body.photoId) user.photo = await entityManger.findOne(Photo, req.body.photoId) || null;

        await entityManger.save(User, user);
        return res.status(200).json(user);
    } else {
        return res.status(404).json(user);
    }
}

export const listUsers = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const filters: Record<string,any> = {};

    if (req.query.role) filters.role = req.query.role;
    if (req.query.status) filters.status = req.query.status;

    let users = await entityManger.find(User, filters);
    return res.status(200).json(users);
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
    const entityManger = getManager();
    const user = await entityManger.findOne(User, req.params.id);

    return res.status(200).json(user);
}
