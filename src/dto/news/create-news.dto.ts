import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
    @ApiProperty({example: 'Test', description: 'title'})
    readonly title?: string;
    @ApiProperty({example: 'Test', description: 'description'})
    readonly description?: string;
}