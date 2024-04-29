import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useStore = create((set) => ({
  formData: [],
  setFormData: (userData) =>
    set((state) => ({
      formData: [...state.formData, { ...userData, id: uuidv4() }],
    })),
  deleteUser: (id) =>
    set((state) => ({
      formData: state.formData.filter((user) => user.id !== id),
    })),
}));



export default useStore;
