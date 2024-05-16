import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useStore = create(
  persist(
    (set) => ({
      formData: [],
      activeId: "",
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
    }),
    {
      name: "userStore", // Nombre para identificar el store en localStorage
      getStorage: () => localStorage, // Especifica el método de almacenamiento (localStorage en este caso)
    }
  )
);

export default useStore;
