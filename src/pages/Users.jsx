import { useEffect, useState } from 'react';
import DashboardUsers from '../components/DashboardUsers';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Endpoint } from '../services/fetchs';

export default function Users() {
  const { users, setUsers } = useAuth();
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users/')
      .then(res => res.json())
      .then(json => setUsers(json))
      .catch(err => console.error('Error fetching users:', err));
  }, [setUsers]);

  const removeUser = async (id) => {
    //     if (endPoint=== Endpoint.administrators){
    //       if (users.lenght>)
    //       if (id=== currentUser.id){
    // //no se puede borrar
    //       }
    //     }

//si esta en vista administradores, habriaque preguntar si 
// quiere quitarle permisos o eliminarlo directamente

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el usuario',
      icon: 'warning',
      showCancelButton: true,
      color: "#1d1d1d",
      iconColor: "#1d1d1d",
      confirmButtonColor: "#77da7e",
      cancelButtonColor: '#1d1d1d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Error al eliminar el usuario');
          }
          setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
          Swal.fire({
            title: 'Eliminado!',
            text: 'El usuario ha sido eliminado.',
            icon:  'success',
            color: '#1d1d1d',
            iconColor: "#1d1d1d",
            confirmButtonColor: '#77da7e',
            cancelButtonColor: '#1d1d1d',
          });
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el usuario.',
            'error'
          );
        }
      }
    });
  };

  const updateUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Error al editar el usuario');
      }
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? user : u))
      );
      Swal.fire(
        'Usuario editado',
        'El usuario fue editado con éxito',
        'success'
      );
    } catch (error) {
      console.error('Error al editar el usuario:', error);
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
        Lista de
        {endPoint === Endpoint.administrators
          ? ' Administradores'
          : ' Usuarios'}
      </h1>
      <table className="w-full h-screen">
        <thead>
          <tr className='text-center text-white flex justify-between gap-2 w-full bg-acentColor px-4'>
            <th className='w-40'>Nombre y Apellido</th>
            <th className='w-40'>Email</th>
            <th className='w-40'>Teléfono</th>
            <th className='w-40'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <DashboardUsers
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
