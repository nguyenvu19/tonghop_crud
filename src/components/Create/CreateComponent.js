import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

export default function CreateComponent({ onUserAdded }) {
  const [inputValues, setInputValues] = useState({
    name: "",
    age: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/data", inputValues)
      .then((response) => {
        onUserAdded();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="col mt-4 ">
      <form onSubmit={handleSubmit}>
        <div className="form-group d-flex flex-row justify-content-between">
          <label>Name</label>
          <input
            type="string"
            className="input-field"
            id="name"
            name="name"
            style={{ width: "350px" }}
            value={inputValues.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group d-flex flex-row justify-content-between">
          <label>Age</label>
          <input
            type="string"
            className="input-field"
            id="age"
            name="age"
            style={{ width: "350px" }}
            value={inputValues.age}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group d-flex flex-row justify-content-between">
          <label>Address</label>
          <input
            type="string"
            className="input-field"
            id="address"
            name="address"
            style={{ width: "350px" }}
            value={inputValues.address}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group d-flex flex-row justify-content-between">
          <label>Phone</label>
          <input
            type="string"
            className="input-field"
            id="phone"
            name="phone"
            style={{ width: "350px" }}
            value={inputValues.phone}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-success" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
