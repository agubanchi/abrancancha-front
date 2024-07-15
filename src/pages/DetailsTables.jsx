import React, { useEffect, useState } from 'react';
import DashboardDetailsTables from '../components/DashboardDetailsTables';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { Endpoint } from '../services/fetchs';

export default function DetailsTables({ endPoint }) {
  const { fetchGet, fetchDelete, fetchUpdate } = useAuth();
  const [table, setTable] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchTabla = async () => {      
      try {
        const response = await fetchGet({ endPoint: endPoint });
        if (!response.ok) {
          throw new Error('Error al obtener los datos....');
        }
        const data = await response.json();
        setTable(data);
      } catch (error) {
        console.error('Error fetching data.....:', error);
      }
    };

    fetchTabla();
  }, [fetchGet, setTable, endPoint]);

  const removeItem = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el dato',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#77da7e',
      cancelButtonColor: '#1d1d1d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetchDelete({
            endPoint: endPoint,
            idData: id,
          });
          if (!response.ok) {
            throw new Error('Error al eliminar el dato');
          }
          setTable((prev) => prev.filter((item) => item.id !== id));
          Swal.fire('Eliminado!', 'El dato ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar el dato:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el dato.', 'error');
        }
      }
    });
  };

  const updateItem = async (tabla) => {
    try {
      const response = await fetchUpdate({
        endPoint: endPoint,
        idData: tabla.id,
        data: tabla,
      });
      if (!response.ok) {
        throw new Error('Error al editar el dato');
      }
      setTable((prev) =>
        prev.map((item) => (item.id === tabla.id ? tabla : item))
      );
      Swal.fire('Dato editado', 'El dato fue editado con éxito', 'success');
    } catch (error) {
      console.error('Error al editar el dato:', error);
      Swal.fire('Error', 'Hubo un problema al editar el dato.', 'error');
    }
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  const tablaSimple = {
    [Endpoint.typesOfCourt]: 'Tipos de Cancha',
    [Endpoint.statusOfCourt]: 'Estados de Cancha',
    [Endpoint.statusOfReservation]: 'Estados de Reserva',
    [Endpoint.statusOfUser]: 'Estados de Usuario',
  };

  return (
    <>
      <h1 className="mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
        Lista de {' ' + tablaSimple[endPoint]}
      </h1>
      <table className="w-full h-screen">
        <thead>
          <tr className="text-center text-white flex justify-between gap-2 w-full bg-acentColor px-4">
            <th className="w-10">ID</th>
            <th className="w-40">Nombre</th>
            <th className="w-40">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {table?.map((item) => (
            <DashboardDetailsTables
              key={item.id}
              item={item}
              removeItem={removeItem}
              handleEdit={handleEdit}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              updateItem={updateItem}
              cancelEdit={cancelEdit}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
