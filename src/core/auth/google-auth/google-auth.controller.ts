import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('google-auth')
export class GoogleAuthController{
    
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
  
    }
  
    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req  ) {
  
  
      return req.user
  
    }
}