import { firestore as db } from "./firebase";

export const setDataToDocumentInCollectionAsync = (collection, document, data) =>
  db
    .collection(collection)
    .doc(document)
    .set(data);

export const addDataToCollectionAsync = (collection, data) =>
  db
    .collection(collection)
    .add(data);

export const updateDataOfDocumentInCollectionAsync = (collection, document, data) =>
  db
    .collection(collection)
    .doc(document)
    .update(data);

export const getDocumentInCollectionAsync = (collection, document) =>
  db
    .collection(collection)
    .doc(document)
    .get();

export const getAllDocumentsInCollectionAsync = (collection) =>
  db
    .collection(collection)
    .get();

export const deleteDocumentFromCollectionAsync = (collection, document) =>
  db
    .collection(collection)
    .doc(document)
    .delete();