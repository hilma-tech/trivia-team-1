import { UploadedFile } from '@hilma/fileshandler-client';
import { create } from 'zustand';
import { ImageFile } from '../utils/Interfaces'


interface ImagesFilesZus {
    addQuestionImage:(value: ImageFile) => void ;
    questionImagesObject: ImageFile[];
}

const useImageFileUpload = create<ImagesFilesZus>((set) => ({
    questionImagesObject: [],
    addQuestionImage: (value: ImageFile) => set((prev) => {
        return { questionImagesObject: [...prev.questionImagesObject, value] }
    }),
}))

export default useImageFileUpload;