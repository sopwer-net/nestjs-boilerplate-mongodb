import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { FacebookAuthGuard } from "./facebook-auth.guard";

@Controller('facebook-auth')
export class FaceookAuthController{
    @Get('/facebook')
    @UseGuards(FacebookAuthGuard)
    async facebookLogin(@Req() req): Promise<any> {}
  
    @Get('/facebook/redirect')
    @UseGuards(FacebookAuthGuard)
    async facebookLoginRedirect(@Req() req): Promise<any> {
  
      return req.user
  
    }
  
  
}