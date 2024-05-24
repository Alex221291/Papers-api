import { ApiProperty } from "@nestjs/swagger";
import { GetPaperDto } from "../paper/get-paper.dto";

export class GetCategotyPapersDto {
    @ApiProperty({example: 'bf6792ad-4f20-4134-8373-5b1373ff3588', description: 'id'})
    readonly id?: string;
    @ApiProperty({example: 'Test', description: 'name'})
    readonly name?: string;
    //@ApiProperty({example: '', description: 'name'})
    readonly papers?: GetPaperDto[];
}