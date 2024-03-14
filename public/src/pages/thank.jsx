import backgroundImage from "../assets/bggg.png";
import styled from "styled-components";

export default function Thank() {
  return <Container className="thank">THANK YOU</Container>;
}

const Container = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  width: 100vw;
  background-image: url(${backgroundImage});
  background-size: cover;
  text-align: center;
`;
