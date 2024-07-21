import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Endpoint } from '../../services/fetchs';
import ButtonAdd from '../../components/ButtonAdd';
import TarifasDetalles from './TarifasDetalles';
import { proper } from '../../services/utils';

export default function Tarifas({ endPoint = Endpoint.tariffs }) {
  const { fetchGet, fetchCreate, fetchDelete, fetchUpdate } = useAuth();
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
  }, [fetchGet, setTable]);

  const createItem = async (tabla) => {
    Swal.fire({
      title: 'Ingrese los datos de la tarifa',
      html: `
      <input id="swal-input1" class=" p-3  rounded-md border-acentColor border-2" placeholder="nombre">
      <input id="swal-input2" class=" p-3  rounded-md border-acentColor border-2" placeholder="precio"
            type="number">`,
      // input: 'text', className="w-full p-3  rounded-md border-acentColor border-2"
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      focusConfirm: false,
      preConfirm: async (algoBoolean) => {
        const formData = {
          name: proper(document.getElementById('swal-input1').value),
          price: Number(
            document.getElementById('swal-input2').value.replace(',', '.')
          ),
        };

        if (formData.name.length < 3)
          return Swal.showValidationMessage(
            'El nombre debe tener minimo 3 caracteres.'
          );
        if (!(/^-?\d{1,8}(\.\d{1,2})?$/.test(formData.price.toString())))
          return Swal.showValidationMessage('El precio esta fuera del rango (-99999999.99 to 99999999.99).');

        try {
          const response = await fetchCreate({
            endPoint: endPoint,
            data: formData,
          });
          const data = await response.json();
          if (!response.ok) {
            return Swal.showValidationMessage(`
              ${JSON.stringify(data.message || 'Error al agregar el dato')}
            `);
          }
          return data;

        } catch (error) {
          Swal.showValidationMessage(`
            Request failed: ${error}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        setTable((prev) => [...prev, result.value]);
        Swal.fire('Agregado!', 'El dato ha sido agregado.', 'success');

        // Swal.fire({
        //   title: `${result.value.login}'s avatar`,
        //   imageUrl: result.value.avatar_url,
        // });
      }
    });
  };

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

  const tablaSimple = { [Endpoint.tariffs]: 'Tarifas' };

  return (
    <>
      <h1 className="mb-2 font-Bebas text-center py-2 text-acentColor lg:text-[5.7rem] lg:leading-[5.2rem] text-[4.7rem] leading-[4.9rem] uppercase">
        Lista de {' ' + tablaSimple[endPoint]}
      </h1>
      <table className="w-full h-screen">
        <ButtonAdd handleAdd={createItem} caption={tablaSimple[endPoint]} />
        <thead>
          <tr className="text-center text-white flex justify-between gap-2 w-full bg-acentColor px-4">
            <th className="w-10">ID</th>
            <th className="w-40 break-all">Nombre</th>
            <th className="w-40 break-all">Precio</th>
            <th className="w-40 break-all">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {table?.map((item) => (
            <TarifasDetalles
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
