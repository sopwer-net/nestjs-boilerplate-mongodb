import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FileManagerService } from './file-manager.service';

@Module({
  providers: [FileManagerService],
  exports:[FileManagerService]
})
export class FileManagerModule {}
