import React from 'react';

const DashboardUsers = ({ user }) => {
  return (
    <>
    <tr className='text-center text-white font-medium'>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.telefono}</td>
      <td>{user.cancha}</td>
      <td>{user.tipo}</td>
      <td>{user.date}</td>
      <td>
        {/* botones de acciones */}
      </td>
    </tr>
      <tr className='text-center text-textColor bg-white font-medium'>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.telefono}</td>
      <td>{user.cancha}</td>
      <td>{user.tipo}</td>
      <td>{user.date}</td>
      <td>
        {/* botones de acciones */}
      </td>
    </tr>
    </>
  );
};

export default DashboardUsers;
