import React, { useEffect, useState } from "react";

import "./styles.css";
import CreateComponent from "../Create";
import UpdateComponent from "../Update";
import axios from "axios";

export default function ListComponent() {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const fetchData = () => {
    axios
      .get("http://localhost:3030/data")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log("Error fetching data: ", error);
      });
  };

  const handleCreateUser = () => {
    setDisplayCreate(!displayCreate);
    setDisplayUpdate(false);
  };

  const handleUpdateUser = () => {
    setDisplayUpdate(!displayUpdate);
    setDisplayCreate(false);
  };

  const handleUserAdded = () => {
    setDisplayCreate(false);
    fetchData();
  };

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:3030/data/${id}`)
      .then((response) => {
        console.log(response);
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
                    <tr key={item.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td className="d-flex">
                        <div
                          className="edit-btn px-2 py-1 mr-2 rounded-top rounded-bottom"
                          onClick={handleUpdateUser}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <button
                          className="delete-btn px-2 py-1 rounded-top rounded-bottom"
                          onClick={() => handleDeleteUser(item.id)}
                        >
                          <i
                            className="fa fa-times delete-btn"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <button className="btn btn-primary" onClick={handleCreateUser}>
              Create user
            </button>
          </div>
        </div>
        {displayCreate && <CreateComponent onUserAdded={handleUserAdded} />}
        {displayUpdate && <UpdateComponent />}
        {displayCreate === false && displayUpdate === false && (
          <div className="col mt-4 "></div>
        )}
      </div>
    </div>
  );
}
