import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class HashService{
    async hashPassword(password: string){
        const passwordhash =  await bcrypt.hash(password,10)
        return passwordhash;
    }

    async comparePassword(password:string,hashPassword){
      const comparePassword = await bcrypt.compare(password,hashPassword)
      return comparePassword
    }
}

