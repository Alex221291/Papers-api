import { ApiProperty } from "@nestjs/swagger";

export class CreateCategotyDto {
    @ApiProperty({example: 'Test', description: 'name'})
    readonly name?: string;
}