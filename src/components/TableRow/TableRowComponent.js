import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TableRowComponent({
  item,
  handleUpdateUser,
  handleDeleteUser,
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedAddress, setEditedAddress] = useState(item.address);
  const handleUpdateRow = () => {
    setIsEdited(true);
  };

  useEffect(() => {
    setEditedName(item.name);
    setEditedAddress(item.address);
  }, [item, setEditedName, setEditedAddress]);

  const handleSubmit = () => {
    const updatedUserData = {
      ...item,
      name: editedName,
      address: editedAddress,
    };

    axios
      .put(`http://localhost:3030/data/${item.id}`, updatedUserData)
      .then((response) => {})
      .catch((error) => {
        console.log("Error", error);
      });
    setIsEdited(false);
  };
  console.log({ editedName });
  return (
    <tr>
      <th scope="row">{item.id}</th>
      <td onClick={handleUpdateRow}>
        {isEdited ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          editedName
        )}
      </td>
      <td onClick={handleUpdateRow}>
        {isEdited ? (
          <input
            type="text"
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
          />
        ) : (
          editedAddress
        )}
      </td>
      <td className="d-flex">
        {isEdited ? (
          <div
            className="edit-btn px-2 py-1 mr-2 rounded-top rounded-bottom"
            onClick={handleSubmit}
          >
            <i className="fa fa fa-check" aria-hidden="true"></i>
          </div>
        ) : (
          <>
            <div
              className="edit-btn px-2 py-1 mr-2 rounded-top rounded-bottom"
              onClick={() => handleUpdateUser(item.id)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <button
              className="delete-btn px-2 py-1 rounded-top rounded-bottom"
              onClick={() => handleDeleteUser(item.id)}
            >
              <i className="fa fa-times delete-btn" aria-hidden="true"></i>
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
