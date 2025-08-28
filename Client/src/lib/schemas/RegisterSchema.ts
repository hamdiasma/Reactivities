import {z} from "zod";
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    displayName: requiredString('displayname'),
    email:z.string().email(),
    password:requiredString('password'),
    cfpassword:requiredString('password'),
}).refine((data)=> data.password === data.cfpassword,{
   message: "Passwords do not match",
   path:['cfpassword']
})

export type RegisterSchema = z.infer<typeof registerSchema>;