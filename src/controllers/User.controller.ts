import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User.model';
import { Notification } from '../models/Notification.model';
import { Form } from '../models/Form.model';
import { newToken } from '../utils/user.utils';
import { UserI } from '../intefaces/User.interface';
import { NotificationI } from '../intefaces/Notification.interface';
import { FormI } from '../intefaces/Form.interface';

export class UserController {
    static register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                throw new Error('Missing important fields!');
            }

            const user = await User.findOne({ email: email });
            if (user) {
                throw new Error('Email already used');
            }

            const newUser: UserI = await User.create(req.body);
            res.status(201).send({ error: false, message: 'User created', user: { _id: newUser._id, email: newUser.email } });
        } catch (error) {
            res.status(400).send({ error: true, message: error.message, err: error });
        }
    }

    static formRegister = async (req: Request, res: Response) => {
        try{
            const { homeType, homeArea, howMuchPeople, haveThermostat, homeHeater, waterHeater, clientId } = req.body;
            if (!homeType || !homeArea || !howMuchPeople || !haveThermostat || !clientId ) {
                throw new Error('Missing important fields!');
            }

            const form = await Form.findOne({ clientId: clientId });
            if (clientId) {
                throw new Error('Le Form is already send');
            }

            const newForm: FormI = await Form.create(req.body);
            res.status(201).send({ error: false, message: 'Form created', form: { _id: newForm._id } });
        }
        catch (error) {
            res.status(400).send({ error: true, message: error.message, err: error });
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new Error('Missing important fields!');
            }

            let user: UserI = await User.findOne({ email: email, password: password });
            if (!user) {
                throw new Error('Please provide a valid email and password.');
            }

            user = await newToken(user);
            res.status(200).send({ error: false, message: 'User connected', user: { _id: user._id, email: user.email, token: user.token } });
        } catch (error) {
            res.status(400).send({ error: true, message: error.message, err: error });
        }
    }

    static getAllNotifications = async (req: Request, res: Response) => {
        try {
            // Récupération de l'utilisateur grâce au Authmiddleware qui rajoute le token dans req
            const request: any = req;
            const user: UserI = request.user;

            const allNotifications: NotificationI[]  = await Notification.find({ targetId: user._id }, { __v: 0 });

            res.status(200).send({ error: false, message: 'Successfull notifications acquisition', notifications: allNotifications});
        } catch (error) {
            res.status(400).send({ error: true, message: error.message, err: error });
        }
    }
}
