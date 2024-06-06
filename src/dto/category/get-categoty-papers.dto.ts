import { ApiProperty } from "@nestjs/swagger";
import { GetPaperDto } from "../paper/get-paper.dto";

export class GetCategotyPapersDto {
    readonly id?: string;
    readonly name?: string;
    readonly papers?: GetPaperDto[];
}