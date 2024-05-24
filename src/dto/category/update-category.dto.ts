import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategotyDto {
    @ApiProperty({example: 'bf6792ad-4f20-4134-8373-5b1373ff3588', description: 'id'})
    readonly id?: string;
    @ApiProperty({example: 'Test', description: 'name'})
    readonly name?: string;
}