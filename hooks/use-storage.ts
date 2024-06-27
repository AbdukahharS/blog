import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'

import { storage } from '@/lib/firebase/config'

export const useStorage = () => {
  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
  }

  const deleteFile = async (path: string) => {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  }

  return { uploadFile, deleteFile }
}

export default useStorage
