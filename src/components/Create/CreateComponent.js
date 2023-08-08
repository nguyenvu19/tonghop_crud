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

  const [validation, setValidation] = useState({
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
    const validationErrors = {};
    let hasErrors = false;

    if (!inputValues.name.trim()) {
      validationErrors.name = "Name cannot be empty";
      hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(inputValues.name)) {
      validationErrors.name = "Name must contain only letters and spaces";
      hasErrors = true;
    }

    if (!inputValues.age.trim()) {
      validationErrors.age = "Age cannot be empty";
      hasErrors = true;
    } else if (isNaN(inputValues.age)) {
      validationErrors.age = "Age must be a number";
      hasErrors = true;
    }

    if (!inputValues.address.trim()) {
      validationErrors.address = "Address cannot be empty";
      hasErrors = true;
    } else if (!/^[A-Za-z\s]+$/.test(inputValues.address)) {
      validationErrors.address = "Address must contain only letters and spaces";
      hasErrors = true;
    }

    if (!inputValues.phone.trim()) {
      validationErrors.phone = "Phone cannot be empty";
      hasErrors = true;
    } else if (isNaN(inputValues.phone)) {
      validationErrors.phone = "Phone must be a number";
      hasErrors = true;
    }

    if (hasErrors) {
      setValidation(validationErrors);
      return;
    }
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
        <div className="form-group">
          <div className="d-flex flex-row justify-content-between">
            <label>Name</label>
            <div className="d-flex flex-column">
              <input
                type="string"
                className="input-field"
                id="name"
                name="name"
                style={{ width: "350px" }}
                value={inputValues.name}
                onChange={(e) => handleChange(e)}
              />
              {validation.name && (
                <span className="text-danger">{validation.name}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="d-flex flex-row justify-content-between">
            <label>Age</label>
            <div className="d-flex flex-column">
              <input
                type="string"
                className="input-field"
                id="age"
                name="age"
                style={{ width: "350px" }}
                value={inputValues.age}
                onChange={(e) => handleChange(e)}
              />
              {validation.age && (
                <span className="text-danger">{validation.age}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="d-flex flex-row justify-content-between">
            <label>Address</label>
            <div className="d-flex flex-column">
              <input
                type="string"
                className="input-field"
                id="address"
                name="address"
                style={{ width: "350px" }}
                value={inputValues.address}
                onChange={(e) => handleChange(e)}
              />
              {validation.address && (
                <span className="text-danger">{validation.address}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="d-flex flex-row justify-content-between">
            <label>Phone</label>
            <div className="d-flex flex-column">
              <input
                type="string"
                className="input-field"
                id="phone"
                name="phone"
                style={{ width: "350px" }}
                value={inputValues.phone}
                onChange={(e) => handleChange(e)}
              />
              {validation.phone && (
                <span className="text-danger">{validation.phone}</span>
              )}
            </div>
          </div>
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
