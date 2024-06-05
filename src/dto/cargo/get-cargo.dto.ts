import { PictureType } from "../enums/picture-type.enum";

export class GetCargoDto {
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
    readonly pictures?: PicturesShortInfo[];
}

export class PicturesShortInfo {
    readonly id?: string;
    readonly type?: PictureType;
}