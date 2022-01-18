import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SesModule } from "@nextnm/nestjs-ses";
@Module({
    imports : [ 
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal : true
          }),
        SesModule.forRoot({
            SECRET: `${process.env.SECRET_SES}`,
            AKI_KEY: `${process.env.API_KEY_SES}`,
            REGION: `${process.env.REGION_sES}`,
        }),],
        exports : [SesModule]
    })

export class SimpleEmailServiceModule{

}