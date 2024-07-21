import { FaEdit, FaCheckSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";

const TarifasDetalles = ({ item, removeItem, handleEdit, editingItem, setEditingItem, updateItem, cancelEdit }) => {
  const isEditing = editingItem && editingItem.id === item.id;

  return (
    <tr className='text-center text-white flex justify-between gap-2 w-full px-4 py-2 items-center'>
      <td className="content-start w-10">{item.id}</td>
     <td className='w-40 break-all'>
        {isEditing ? (
          <input
          className="text-textColor text-center my-2 py-1  border-acentColor rounded-md border-2"
            type="text"
            value={editingItem.name}
            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
          />
        ) : (
          item.name
        )}
      </td>
     <td className='w-40 break-all'>$ {" "}
        {isEditing ? (
          <input
          className="text-textColor text-center my-2 py-1  border-acentColor rounded-md border-2"
            type="text"
            value={editingItem.price}
            onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
          />
        ) : (
          item.price
        )}
      </td>
      <td className='w-40 flex justify-around break-all'>
        {isEditing ? (
          <>
            <FaCheckSquare onClick={() => updateItem(editingItem)} />
            <ImCancelCircle onClick={cancelEdit} />
          </>
        ) : (
          <>
             <FaEdit className="cursor-pointer" onClick={() => handleEdit(item)} />
            <MdDelete onClick={() => removeItem(item.id)} />
          </>
        )}
      </td>
    </tr>
  );
};

export default TarifasDetalles;
