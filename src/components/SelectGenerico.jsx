import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SelectGenerico = ({ endPoint }) => {
  const { fetchGet } = useAuth();
  const [data, setData] = useState([]);
  //-------------------------------------------------------------------------
  const fetchDataAuxiliar = async () => {
    try {
      const response = await fetchGet({ endPoint: endPoint });
      const allData = await response.json();
      allData.sort((a, b) => a.name.localeCompare(b.name));
      //   allData.sort((a, b) => {
      //     if (a.name < b.name) return -1;
      //     else if (a.name > b.name) return 1;
      //     else return 0;
      //   });
      //------------------------------------------------------------------------------
      //   export const arrayToMap = async (array) => {
      //     const newMap = new Map();
      //     array.forEach((row) => {
      //       newMap.set(row.id, row);
      //     });
      //     return newMap;
      //   };
      //------------------------------------------------------------------------------
      setData(allData);
    } catch (error) {
      console.log(error); /* alert("ojo") */ /* err = setError(err) */
    }
  };

  useEffect(() => {
    fetchDataAuxiliar();
  }, [data]);

  return (
    <>
      {data.map((elem) => (
        <option key={elem.id} value={elem.id}>
          {elem.name}
        </option>
      ))}
      {/* <option value="Futbol5">Futbol 5</option> */}
    </>
  );
};

export default SelectGenerico;
