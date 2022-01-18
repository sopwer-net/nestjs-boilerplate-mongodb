import { FileManagerGoogleService } from "./file-manager-google.service"
import { Test } from '@nestjs/testing';


describe('fileManagerGoogleService',()=>{
    let fileManagerGoogleService : FileManagerGoogleService

    beforeEach(async ()=>{
        const module = await Test.createTestingModule({
            providers : [FileManagerGoogleService]
        }).compile()

        fileManagerGoogleService = await module.get<FileManagerGoogleService>(FileManagerGoogleService)
    })

    describe('it called fileManagerGoogleService.delete' , ()=>{
        it('should called bucket google',async()=>{
            const result = await fileManagerGoogleService.delete('fileName.jpg')
        })
    })
})