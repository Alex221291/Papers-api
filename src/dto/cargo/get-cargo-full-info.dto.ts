import { Picture } from "@prisma/client";

export class GetCargoFullInfoDto {
    readonly id?: string;
    readonly title?: number;
    readonly weight?: number;
    readonly shortDescription?: string;
    readonly articleNumber?: string;
    readonly packageQuantity?: number;
    readonly description?: string;
    readonly price?: string;
    readonly width?: string;
    readonly density?: string;
    readonly winding?: string;
    readonly packagingType?: string;
    readonly paperId?: string;
    readonly pictures?: Picture[];
}