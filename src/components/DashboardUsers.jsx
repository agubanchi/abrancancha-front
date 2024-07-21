import { FaEdit, FaCheckSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { useAuth } from "../context/AuthContext";

const DashboardUsers = ({ user, removeUser, handleEdit, editingUser, setEditingUser, updateUser, cancelEdit }) => {
  const { currentUser} = useAuth();
  const isEditing = editingUser && editingUser.id === user.id;

  return (
    <tr className='text-center  text-white flex justify-between gap-2 w-full px-4 py-2 items-center'>
      <td className="content-start w-10">{user.id}</td>
      <td className="content-start w-25"><img className="w-full max-w-20 rounded-lg items-center justify-center" src={user.avatar} alt={user.fullname} /></td>
     <td className='w-40 break-all'>
        {isEditing ? (
          <input
          className="text-textColor text-center my-2 py-1  border-acentColor rounded-md border-2"
            type="text"
            value={editingUser.fullname}
            onChange={(e) => setEditingUser({ ...editingUser, fullname: e.target.value })}
          />
        ) : (
          user.fullname
        )}
      </td>
      <td className='w-40 break-all'>
        {isEditing ? (
          <input
          className="text-textColor text-center my-2 py-1  border-acentColor rounded-md border-2"
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
          />
        ) : (
          user.email
        )}
      </td>
      <td className='w-40 break-all'>
        {isEditing ? (
          <input
          className="text-textColor text-center my-2 py-1  border-acentColor rounded-md border-2"
            type="tel"
            value={editingUser.phone}
            onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
          />
        ) : (
          user.phone
        )}
      </td>
      <td className='w-40 flex justify-around '>
        {isEditing ? (
          <>
            <FaCheckSquare onClick={() => updateUser(editingUser)} />
            <ImCancelCircle onClick={cancelEdit} />
          </>
        ) : (
          <>
             <FaEdit className="cursor-pointer" onClick={() => handleEdit(user)} />
             {(user.id === currentUser.id)?<>-</>:
            <MdDelete onClick={() => removeUser(user.id)} />}
          </>
        )}
      </td>
    </tr>
  );
};

export default DashboardUsers;
