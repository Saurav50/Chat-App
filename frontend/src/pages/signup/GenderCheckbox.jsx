import React from "react";

const GenderCheckbox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex mt-1 mb-3">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text  ">Male</span>
          <input
            type="checkbox"
            className={`checkbox border-slate-800 ${
              selectedGender === "male" ? "selected" : ""
            }`}
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className={`checkbox border-slate-800 ${
              selectedGender === "female" ? "selected" : ""
            }`}
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
