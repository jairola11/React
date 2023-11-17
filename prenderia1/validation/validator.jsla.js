import { check } from "express-validator";

export const validartorCliente=[
    check('identificacion','error en la identificacion ')
    .exists()
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({min:1,max:12}),
    check('nombres','error en los nombres ')
    .exists()
    .not()
    .isEmpty()
    .isLength({min:1,max:45}),
    check('direccion','error en la direccion ')
    .exists()
    .not()
    .isEmpty()
    .isLength({min:1,max:45}),
    check('telefono','error en  el ingrso del telefono  ')
    .exists()
    .not()
    .isEmpty()
    .isLength({min:1,max:45}),
    check('fechaNa','error en  el ingrso del telefono  ')
    .exists()
    .not()
    .isEmpty()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
    check('password','error  en la ingrso de la contraseña   ')
    .exists()
    .not()
    .isEmpty()
    .isLength({min:3,max:45}),
    
]