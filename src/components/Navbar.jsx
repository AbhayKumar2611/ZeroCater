import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        border: "1px solid green",
        background: "teal",
        color: "white",
      }}
    >
      <div style={{ fontSize: "25px", fontWeight: "bold" }}>
        Recipies Website
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          // border: "1px solid red",
          padding: "10px",
          justifyContent: "space-between",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            color: isActive ? "red" : "wheat",
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            color: isActive ? "red" : "wheat",
          })}
        >
          About
        </NavLink>
        <NavLink
          to="/addRecipies"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            color: isActive ? "red" : "wheat",
          })}
        >
          Add Rcipies
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) => ({
            textDecoration: isActive ? "underline" : "none",
            color: isActive ? "red" : "wheat",
          })}
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
