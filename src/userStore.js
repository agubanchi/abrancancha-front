import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

const useStore = create((set) => ({
  formData: [],
  activeId:'',
  setFormData: (userData) =>
    set((state) => ({
      formData: [...state.formData, { ...userData, id: uuidv4() }],
    })),
  deleteUser: (id) =>
    set((state) => ({
      formData: state.formData.filter((user) => user.id !== id),
    })),
    
    getUserById: (id) => {
      set({ activeId: id }); // Actualiza activeId con el ID del usuario
    },
    updateUsers: (data) => {
      set((state) => ({
        formData: state.formData.map((user) =>
          user.id === state.activeId ? { ...user, ...data } : user
        ),
        activeId: null, // Establecer activeId en null después de la edición
      }));
    },
}));



export default useStore;
