import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage from "../assets/bggg.png";
import "./index.css";

export default function SignIn() {
  const navigate = useNavigate();

  useEffect(()=>{
    const getsuer = async()=>{
      const data = await localStorage.getItem('user');
      if(data){
        navigate("/");
      }
    }
  },[])
  let [formlabel, setformlabel] = useState({
    name: "",
    teamname: "",
    regno: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: formlabel.name,
        regno: formlabel.regno,
        teamname: formlabel.teamname,
      })
    );
    navigate("/");
  };

  const handleChange = (event) => {
    setformlabel((prevFormLabel) => ({
      ...prevFormLabel,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <FormContainer>
        <div className="rectangle">
          <h1>Register</h1>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              type="text"
              placeholder="Team Name"
              name="teamname"
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              type="text"
              placeholder="Registration number"
              name="regno"
              onChange={(e) => handleChange(e)}
              required
            />
            <button className="button" type="submit">
              Enter
            </button>
          </form>
        </div>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: fit-screen;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 0.5rem;
    border: 0.1rem solid #ffffff;
    border-radius: 0.7rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #27a5ef;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
