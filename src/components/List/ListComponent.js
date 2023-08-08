import React, { useEffect, useState } from "react";

import "./styles.css";
import CreateComponent from "../Create";
import UpdateComponent from "../Update";
import axios from "axios";
import TableRowComponent from "../TableRow";

export default function ListComponent() {
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  console.log({ data });
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3030/data")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  const handleCreateUser = () => {
    setDisplayCreate(!displayCreate);
    setDisplayUpdate(false);
  };

  const handleUpdateUser = (id) => {
    setDisplayUpdate(true);
    setDisplayCreate(false);
    setSelectedUserId(id);
  };

  const handleUserAdded = () => {
    setDisplayCreate(false);
    fetchData();
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:3030/data/${id}`)
      .then((response) => {
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-column align-items-center">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">name</th>
                  <th scope="col">address</th>
                  <th scope="col">actions</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item) => (
                    <TableRowComponent
                      key={item.id}
                      item={item}
                      handleUpdateUser={handleUpdateUser}
                      handleDeleteUser={handleDeleteUser}
                    />
                  ))}
              </tbody>
            </table>

            <button className="btn btn-primary" onClick={handleCreateUser}>
              Create user
            </button>
          </div>
        </div>
        {displayCreate && <CreateComponent onUserAdded={handleUserAdded} />}
        {displayUpdate && (
          <UpdateComponent
            userId={selectedUserId}
            onUserUpdate={() => {
              setDisplayUpdate(false);
              fetchData();
            }}
          />
        )}
        {displayCreate === false && displayUpdate === false && (
          <div className="col mt-4 "></div>
        )}
      </div>
    </div>
  );
}
