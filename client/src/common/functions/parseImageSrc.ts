import selectImage from '../../images/image.svg'
import { ImageFile } from '../../utils/Interfaces';

export function parseImageSrc(imageFile?: ImageFile ) {
    if (!imageFile) return selectImage;

    if (typeof imageFile === "string") return imageFile;

    if(imageFile.id < 0) return selectImage;
    return imageFile.link;
}