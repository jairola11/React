import {check} from 'express-validator';

export const validatorUser =
[
    check('correo','El correo es incorrecto..!!').isEmail().notEmpty(),
    check('nombres','El nombre es requerido y máximo 50 caracteres').isLength({max:50}).notEmpty(),
    check('rol','rol incorrecto..!!').isIn(['administrador','usuario'])
];