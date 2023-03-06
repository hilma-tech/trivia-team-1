import { UploadedFile } from '@hilma/fileshandler-client';
import { create } from 'zustand';
import { imageFile } from '../utils/Interfaces'


interface imagesFilesZus {
    addQuestionImage:(value: imageFile) => void ;
    questionImagesObject: imageFile[];
}

const useImageFileUpload = create<imagesFilesZus>((set) => ({
    questionImagesObject: [],
    addQuestionImage: (value: imageFile) => set((prev) => {
        return { questionImagesObject: [...prev.questionImagesObject, value] }
    }),
}))

export default useImageFileUpload;