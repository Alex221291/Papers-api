import { PictureType } from "../enums/picture-type.enum";

export class GetCargoDto {
    readonly id?: string;
    readonly title?: string;
    readonly weight?: number;
    readonly shortDescription?: string;
    readonly articleNumber?: string;
    readonly packageQuantity?: number;
    readonly description?: string;
    readonly price?: number;
    readonly width?: number;
    readonly density?: number;
    readonly winding?: number;
    readonly packagingType?: string;
    readonly paperId?: string;
    readonly pictures?: string[];
}