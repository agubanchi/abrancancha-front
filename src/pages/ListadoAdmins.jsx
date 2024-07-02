// src/components/ListadoAdmins.jsx
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Modal from '../components/Modal';
import { useAuth } from "../context/AuthContext";

const ListadoAdmins = ({ onEdit }) => {
  const { users, setUsers } = useAuth();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Filtra los usuarios que son administradores
    const adminUsers = users.filter(user => user.role === 'admin');
    setAdmins(adminUsers);
  }, [users]);

  const removeAdmin = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al administrador',
      icon: 'warning',
      showCancelButton: true,
      color: "#1d1d1d",
      iconColor: "#1d1d1d",
      confirmButtonColor: "#77da7e",
      cancelButtonColor: '#1d1d1d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Error al eliminar al administrador');
        }
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        Swal.fire('Eliminado!', 'El administrador ha sido eliminado.', 'success');
      } catch (error) {
        console.error("Error al eliminar al administrador:", error);
        Swal.fire('Error', 'Hubo un problema al eliminar al administrador.', 'error');
      }
    }
  };

  const handleEditar = (id) => {
    const adminEdit = admins.find(admin => admin.id === id);
    onEdit(adminEdit); // Pasar el administrador a editar al formulario
  };

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {admins.length ? (
        <>
          <h2 className="font-black text-3xl text-center text-acentColor">Listado de Administradores</h2>
          <p className="text-lg mt-5 text-center mb-10 text-white">Verifica los{' '}
            <span className="text-acentColor font-bold">Administradores</span>
          </p>
          <table className="min-w-full bg-gray-800">
            <thead>
              <tr className="w-full bg-gray-900 text-white">
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Correo Electrónico</th>
                <th className="py-2 px-4">Teléfono</th>
                <th className="py-2 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="text-center text-white bg-gray-700">
                  <td className="py-2 px-4">{admin.name}</td>
                  <td className="py-2 px-4">{admin.email}</td>
                  <td className="py-2 px-4">{admin.telefono}</td>
                  <td className='flex justify-around py-2 gap-2 items-center'>
                    <FaEdit className="cursor-pointer" onClick={() => handleEditar(admin.id)} />
                    <MdDelete className="cursor-pointer" onClick={() => removeAdmin(admin.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center text-acentColor">No hay Administradores</h2>
          <p className="text-xl mt-5 mb-10 text-center text-white">
            Comienza agregando un Administrador{' '}
            <span className="text-acentColor font-bold">y lo verás aquí</span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListadoAdmins;