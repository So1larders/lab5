import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc
} from 'firebase/firestore';

export const cityService = {
  async createBuilding(userId, buildingData) {
    try {
      const buildingsRef = collection(db, 'buildings');
      const docRef = await addDoc(buildingsRef, {
        ...buildingData,
        userId,
        createdAt: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating building:', error);
      throw error;
    }
  },

  async updateBuilding(buildingId, buildingData) {
    try {
      const buildingRef = doc(db, 'buildings', buildingId);
      await updateDoc(buildingRef, buildingData);
    } catch (error) {
      console.error('Error updating building:', error);
      throw error;
    }
  },

  async getBuildings(userId) {
    try {
      const buildingsRef = collection(db, 'buildings');
      const q = query(buildingsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting buildings:', error);
      throw error;
    }
  },

  async getResources(userId) {
    try {
      const resourcesRef = doc(db, 'resources', userId);
      const docSnap = await getDoc(resourcesRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Initialize resources if they don't exist
        const initialResources = {
          budget: 200000000,
          materials: 200000000,
          workers: 100000
        };
        await setDoc(resourcesRef, initialResources);
        return initialResources;
      }
    } catch (error) {
      console.error('Error getting resources:', error);
      throw error;
    }
  },

  async updateResources(userId, resources) {
    try {
      const resourcesRef = doc(db, 'resources', userId);
      await setDoc(resourcesRef, resources, { merge: true });
    } catch (error) {
      console.error('Error updating resources:', error);
      throw error;
    }
  }
}; 