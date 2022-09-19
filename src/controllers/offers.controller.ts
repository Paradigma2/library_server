// import { Request, Response } from 'express';
// import { getManager } from 'typeorm';
// import { validate } from 'class-validator';
// import { Realestate } from '../entities/Realty';
// import { Offer } from '../entities/Offer';
// import { User } from '../entities/User';
//
// export const createOffer = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         const entityManger = getManager();
//         const offer = new Offer();
//
//         const user = await entityManger.findOne(User, req.body.userId);
//         const realty = await entityManger.findOne(Realestate, req.params.id);
//
//         offer.from = req.body.from;
//         offer.to = req.body.to;
//         offer.user = user as User;
//         offer.realty = realty as Realestate;
//         console.log(offer);
//         const errors = await validate(offer, { skipMissingProperties: true });
//         if (errors.length > 0) { return res.status(422).json(errors); }
//
//         await entityManger.save(Offer, offer);
//
//         return res.status(201).json(offer);
//     } catch(err) {
//         console.log(err);
//         return res.status(500).json('Internal server error');
//     }
// }
//
// export const indexOffers = async (req: Request, res: Response): Promise<Response> => {
//     const entityManger = getManager();
//     const filters: Record<string,any> = {};
//
//     if (req.query.accepted) filters.accepted = req.query.accepted;
//     if (req.query.realtyId) filters.realty = req.query.realtyId;
//     // if (req.query.from) filters.price = MoreThanOrEqual(req.query.from);
//     // if (req.query.to) filters.price = LessThanOrEqual(req.query.to);
//
//     const offers = await entityManger.find(Offer, filters);
//     return res.status(200).json(offers);
// }
//
// export const updateOffer  = async (req: Request, res: Response): Promise<Response> => {
//     const entityManger = getManager();
//     let offer = await entityManger.findOne(Offer, req.params.id);
//
//     if (offer) {
//         if (req.body.from) offer.from = req.body.from;
//         if (req.body.to) offer.to = req.body.to;
//
//         await entityManger.save(Offer, offer);
//         return res.status(200).json(offer);
//     } else {
//         return res.status(404).json(offer);
//     }
// }
//
// export const acceptOffer  = async (req: Request, res: Response): Promise<Response> => {
//     const entityManger = getManager();
//     let offer = await entityManger.findOne(Offer, req.params.id);
//
//     if (offer) {
//         offer.accepted = true;
//         await entityManger.save(Offer, offer);
//
//         const otherOffers = await entityManger.find(Offer, { where: { realty: offer.realty.id, accepted: false } });
//         await entityManger.delete(Offer, otherOffers);
//         return res.status(200).json(offer);
//     } else {
//         return res.status(404).json(offer);
//     }
// }
