import { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext';
import { Endpoint, HttpMethod, fetchAll } from "../services/fetchs";
import Swal from 'sweetalert2';
import DashboardAdmins from '../components/DashboardAmins';

export default function Admins() {
  const { users, setUsers, fetchGet, fetchDelete, fetchUpdate } = useAuth();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchGet({ endPoint: Endpoint.administrators });
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [fetchGet, setUsers]);
=======
import DashboardUsers from '../components/DashboardUsers';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function Admins() {
  const { users, setUsers } = useAuth();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users/')
      .then(res => res.json())
      .then(json => setUsers(json))
      .catch(err => console.error('Error fetching users:', err));
  }, [setUsers]);
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688

  const removeUser = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario',
      icon: 'warning',
      showCancelButton: true,
<<<<<<< HEAD
      confirmButtonColor: '#77da7e',
=======
      color: "#1d1d1d",
      iconColor: "#1d1d1d",
      confirmButtonColor: "#77da7e",
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
      cancelButtonColor: '#1d1d1d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
<<<<<<< HEAD
          const response = await fetchDelete({ endPoint: Endpoint.administrators, idData: id });
=======
          const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
          if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
          }
          setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
<<<<<<< HEAD
          Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
=======
          Swal.fire({
            title: 'Eliminado!',
            text: 'El usuario ha sido eliminado.',
            icon:  'success',
            color: '#1d1d1d',
            iconColor: "#1d1d1d",
            confirmButtonColor: '#77da7e',
            cancelButtonColor: '#1d1d1d',
          });
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
          Swal.fire('Error', 'Hubo un problema al eliminar el usuario.', 'error');
        }
      }
    });
  };

  const updateUser = async (user) => {
    try {
<<<<<<< HEAD
      const response = await fetchUpdate({ endPoint: Endpoint.administrators, idData: user.id, data: user });
=======
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
      if (!response.ok) {
        throw new Error('Error al editar el usuario');
      }
      setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? user : u)));
      Swal.fire('Usuario editado', 'El usuario fue editado con éxito', 'success');
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      Swal.fire('Error', 'Hubo un problema al editar el usuario.', 'error');
    }
    setEditingUser(null);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <>
      <h1 className="mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
<<<<<<< HEAD
        Lista de Administradores
=======
        Lista de Usuarios
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
      </h1>
      <table className="w-full h-screen">
        <thead>
          <tr className='text-center text-white flex justify-between gap-2 w-full bg-acentColor px-4'>
<<<<<<< HEAD
          <th className='w-40'>ID</th>
          <th className='w-40'>Avatar</th>
=======
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
            <th className='w-40'>Nombre y Apellido</th>
            <th className='w-40'>Email</th>
            <th className='w-40'>Teléfono</th>
            <th className='w-40'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
<<<<<<< HEAD
            <DashboardAdmins
=======
            <DashboardUsers 
>>>>>>> 90682c4dbea249fca3148bb0a70f5ec12bb9e688
              key={user.id} 
              user={user} 
              removeUser={removeUser} 
              handleEdit={handleEdit} 
              editingUser={editingUser} 
              setEditingUser={setEditingUser} 
              updateUser={updateUser} 
              cancelEdit={cancelEdit}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
