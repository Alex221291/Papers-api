import { PictureType } from "../enums/picture-type.enum";

export class CreateCargoDto {
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
    picturesType?: PictureInfo[];
}

export class PictureInfo {
    readonly name?: string;
    readonly type?: string;
}