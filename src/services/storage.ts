import { firestore, storage } from './firebase'

const imagesCollectionRef = firestore.collection('images')
const storageImagesRef = storage.ref('images')

const avatarsCollectionRef = firestore.collection('avatars')
const storageAvatarsRef = storage.ref('avatars')

const putImage = (
  uid: string,
  data: Blob | Uint8Array | ArrayBuffer,
  metadata?: firebase.default.storage.UploadMetadata
): firebase.default.storage.UploadTask => {
  const newImageKey = imagesCollectionRef.doc().id

  return storageImagesRef.child(uid).child(newImageKey).put(data, metadata)
}

const putAvatar = (
  uid: string,
  data: Blob | Uint8Array | ArrayBuffer,
  metadata?: firebase.default.storage.UploadMetadata
): firebase.default.storage.UploadTask => {
  const newAvatarKey = avatarsCollectionRef.doc().id

  return storageAvatarsRef.child(uid).child(newAvatarKey).put(data, metadata)
}

export { putImage, putAvatar }
