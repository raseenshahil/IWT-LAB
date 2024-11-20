import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";

export function dataEntry(data, cln, uid) {
  return addDoc(collection(db, cln), {
    user_Id: uid,
    ...data,
    time: serverTimestamp(),
  });
}
export async function updateData(cln, id, data) {
  return await updateDoc(doc(db, cln, id), {
    ...data,
  });
}
export async function getData(cln) {
  const List = [];
  const querySnapshot = await getDocs(collection(db, cln));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    List.push({ ...doc.data(), id: doc.id });
    console.log("from");
  });
  return List;
}

export async function deleteData(cln, id) {
  await deleteDoc(doc(db, cln, id));
}

export async function getDataId(cln, id) {
  const docRef = doc(db, cln, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("no data found");
    return null;
  }
}
export async function dataWhere(cln, condition) {
  const List = [];
  try {
    const q = query(collection(db, cln), ...condition);
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
      List.push({ id: doc.id, ...doc.data() });
    });
    return List;
  } catch (e) {
    console.log("error", e);
  }
}

export function dateTime(date) {
  const time = Number(date.slice(16, 18));

  if (time < 12) {
    return date.slice(0, 15) + "  " + time + date.slice(18, 21) + " am";
  } else {
    return date.slice(0, 15) + "  " + (time - 12) + date.slice(18, 21) + " pm";
  }
}

export function removeArrayDup(arr1 = [], arr2 = [], arr3 = []) {
  console.log({ arr1, arr2, arr3 });
  if (arr1[0] === "abs" || arr2[0] === "abs" || arr3[0] === "abs") {
    return ["abs"];
  }

  if (!arr1[0]) {
    if (arr2[0]) {
      const t = arr2;
      arr2 = arr3;
      arr1 = t;
    } else if (arr3[0]) {
      arr1 = arr3;
    }
  } else if (!arr3[0] && arr2[0]) {
    arr2 = arr3;
  }

  if (arr2[0]) {
    arr1 = arr1.filter((x) => arr2.indexOf(x) !== -1);
  } else if (arr3[0]) {
    arr1 = arr1.filter((x) => arr3.indexOf(x) !== -1);
  }

  if (!arr1[0]) {
    arr1 = ["noData"];
  }

  return arr1;
}
