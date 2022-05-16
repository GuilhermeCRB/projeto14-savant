import joi from "joi";
import { stripHtml } from "string-strip-html";

export async function validadeOrder(req, res, next){
    const order = req.body;

    const orderSchema = joi.object({
        userID: joi.array().required(),
        items: joi.array().required(),
        total: joi.number().required(),
        deliverTo: joi.string().required(),
        contact: joi.string().required(),
        street: joi.string().required(),
        number: joi.string().required(),
        complement: joi.string().required(),
        district: joi.string().required(),
        city: joi.string().required(),
        ZIP: joi.string().required(),
        state: joi.string().required(),

        paymentMethod: joi.string().required(),
        card: joi.string().required(),
        installment: joi.string().required()
    })

    const validation = orderSchema.validate(order);
    if (validation.error) return res.status(422).send(validation.error);

    const sanitizedOrder = {
        ...order,
        userID: stripHtml(order.password).result,
        items: stripHtml(order.password).result,
        total: stripHtml(order.password).result,
        deliverTo: stripHtml(order.password).result,
        contact: stripHtml(order.password).result,
        street: stripHtml(order.password).result,
        number: stripHtml(order.password).result,
        complement: stripHtml(order.password).result,
        district: stripHtml(order.password).result,
        city: stripHtml(order.password).result,
        ZIP: stripHtml(order.password).result,
        state: stripHtml(order.password).result,

        paymentMethod: stripHtml(order.password).result,
        card: stripHtml(order.password).result,
        installment: stripHtml(order.password).result
    }

    res.locals.user = sanitizedOrder;

    next();
}