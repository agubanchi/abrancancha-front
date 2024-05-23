import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

const useStore = create(
  persist(
    (set) => ({
      formData: [],
      reservations: [],
      activeId: "",
      setFormData: (userData) =>
        set((state) => {
          const userId = uuidv4();
          return {
            formData: [...state.formData, { ...userData, id: userId }],
            reservations: [
              ...state.reservations,
              { userId, reservationData: null },
            ], // Agrega una reserva vacía con el mismo ID
          };
        }),
      deleteUser: (id) =>
        set((state) => ({
          formData: state.formData.filter((user) => user.id !== id),
          reservations: state.reservations.filter(
            (reservation) => reservation.userId !== id
          ),
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
      setReservationData: (userId, reservationData) =>
        set((state) => ({
          reservations: state.reservations.map((reservation) =>
            reservation.userId === userId
              ? { ...reservation, reservationData }
              : reservation
          ),
        })),
    }),
    {
      name: "userStore", // Nombre para identificar el store en localStorage
      getStorage: () => localStorage, // Especifica el método de almacenamiento (localStorage en este caso)
    }
  )
);

export default useStore;
