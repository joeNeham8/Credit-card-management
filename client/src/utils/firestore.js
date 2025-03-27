import { db } from "../config/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

// Function to add a credit card under a specific user
export const addCreditCard = async (userId, cardData) => {
    try {
        const docRef = await addDoc(
            collection(db, "users", userId, "creditCards"),
            cardData
        );
        console.log("Credit Card added with ID:", docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding credit card:", error);
        return { success: false, error: error.message };
    }
};

// Function to get all saved credit cards for a user
export const getCreditCards = async (userId) => {
    try {
        const querySnapshot = await getDocs(
            collection(db, "users", userId, "creditCards")
        );
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching credit cards:", error);
        return [];
    }
};

// Function to delete a credit card
export const deleteCreditCard = async (userId, id) => {
    try {
        await deleteDoc(doc(db, "users", userId, "creditCards", id));
        console.log("Credit Card deleted");
        return { success: true };
    } catch (error) {
        console.error("Error deleting credit card:", error);
        return { success: false, error: error.message };
    }
};

// Function to update a credit card
export const updateCreditCard = async (userId, id, newData) => {
    try {
        const docRef = doc(db, "users", userId, "creditCards", id);
        await updateDoc(docRef, newData);
        console.log("Credit Card updated");
        return { success: true };
    } catch (error) {
        console.error("Error updating credit card:", error);
        return { success: false, error: error.message };
    }
};
