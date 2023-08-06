import React from "react";

export default function UpdateComponent() {
  return (
    <div className="col mt-4 ">
      <form>
        <div className="form-group d-flex flex-row justify-content-between">
          <label>Name</label>
          <input
            type="string"
            className="input-field"
            id="name"
            name="name"
            style={{ width: "350px" }}
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
          />
        </div>
      </form>

      <div className="d-flex justify-content-center">
        <button className="btn btn-success">Update</button>
      </div>
    </div>
  );
}
