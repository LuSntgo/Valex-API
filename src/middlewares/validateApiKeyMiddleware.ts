import { NextFunction, Request, Response } from "express";
import * as authService from "../services/authService.js"

export async function validateApiKey(req: Request, res : Response, next : NextFunction) {
    
    const apiKey : any = req.headers['x-api-key']

    if(!apiKey) throw {erro_type : "auth_error" , message : "ApiKey not found"}
    const validCompany = await authService.validateCompany(apiKey)
    res.locals.apikey = apiKey
    next()
}