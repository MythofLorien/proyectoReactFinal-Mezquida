import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFPKrSlfyrzkWTEKHJWdJ8utk_eJ9GnpU",
    authDomain: "reactproyectofinal-b6856.firebaseapp.com",
    projectId: "reactproyectofinal-b6856",
    storageBucket: "reactproyectofinal-b6856.appspot.com",
    messagingSenderId: "107547513269",
    appId: "1:107547513269:web:a5858448ea061eb86e89fc",
    measurementId: "G-Z6F929WJMN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const rebootStock = async (jsonData) => {
    try {
        const shoesCollectionRef = collection(db, "shoes");
        for (const item of jsonData) {
            await setDoc(doc(shoesCollectionRef, item.id.toString()), item);
        }
        console.log("Datos cargados correctamente en Firebase");
    } catch (error) {
        console.error("Error al cargar los datos en Firebase:", error);
    }
};

export const getStock = async (varFilter = null) => {
    let q = null
    const verifyFilter = !varFilter ||
        !varFilter.marca ||
        varFilter.marca.length === 0 ||
        varFilter.precioMax === undefined ||
        varFilter.precioMin === undefined;
    q = collection(db, "shoes");

    if (varFilter.marca && varFilter.marca.length > 0) {
        q = query(q, where("marca", "in", varFilter.marca));
    }

    if (varFilter.precioMin && varFilter.precioMax) {
        q = query(
            q,
            where("precio", "<=", varFilter.precioMax),
            where("precio", ">=", varFilter.precioMin)
        );
    }
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        const itemData = doc.data()
        if (varFilter.talle?.length > 0) {
            const filteredStock = itemData.stock.filter((item) =>
                varFilter?.talle?.includes(item.talle))
            filteredStock.length > 0 && data.push(itemData)
        } else
            data.push(itemData)
    });
    return data;
};
