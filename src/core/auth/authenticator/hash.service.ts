import { Injectable, Logger } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class HashService{
    logger  : Logger = new Logger(HashService.name)
    async hashPassword(password: string){
        const passwordhash =  await bcrypt.hash(password,10)
        return passwordhash;
    }

    async comparePassword(password:string,hashPassword){
      try{
        const comparePassword = await bcrypt.compare(password,hashPassword)
        return comparePassword
      }catch(error){
        this.logger.error(error)
      }
 
    }
}

