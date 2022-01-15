import { Module } from "@nestjs/common";
import { SesModule } from "@nextnm/nestjs-ses";

@Module({
    imports : [ 
        SesModule.forRoot({
            SECRET: 'TKjA50XQQ0DItevbrqtVzkVtPXeTg068fLZZAUiJ',
            AKI_KEY: 'AKIA454DOEUVKQ2XB4UZ',
            REGION: 'us-east-2',
        }),],
        exports : [SesModule]
    })

export class SimpleEmailServiceModule{

}