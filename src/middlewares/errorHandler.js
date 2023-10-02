import {logger} from '../utils.js';

export const errorHandler = (error, req, res, next) => {
    logger.error(`error ${error.message}`)
    const status = error.status || 400
    res.status(status).send(error.message)
}