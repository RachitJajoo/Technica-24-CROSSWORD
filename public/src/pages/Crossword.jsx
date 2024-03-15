import { useState } from "react";
import backgroundImage from "../assets/bggg.png";
import Thank from "./thank";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { upload } from "../utils/APIroutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function Crossword({ info }) {
  const navigate = useNavigate();
  //HANDLE KEY TRAERSING
  const handleKeyPress = (event, rowIndex, colIndex) => {
    let newRowIndex = rowIndex;
    let newColIndex = colIndex;
    switch (event.key) {
      case "ArrowUp":
        newRowIndex--;
        break;
      case "ArrowDown":
        newRowIndex++;
        break;
      case "ArrowLeft":
        newColIndex--;
        break;
      case "ArrowRight":
        newColIndex++;
        break;
      default:
        return;
    }
    const key = `${newRowIndex}-${newColIndex}`;
    const nextInput = document.getElementById(`${key}`);
    if (nextInput) {
      nextInput.focus();
    }
  };

  const arr = info["arr"];
  const [grid, setGrid] = useState(info.grid);

  const downstarting = info.downstarting;
  const downwords = info.downwords;
  const acrossstarting = info.acrossstarting;
  const acrosswords = info.acrosswords;

  const handleChange = (rowIndex, colIndex, e) => {
    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = e.target.value.toUpperCase();
    setGrid(updatedGrid);
  };
  const calculateMarks = async (e) => {
    e.preventDefault();
    let ans = 0;
    for (let i = 0; i < downwords.length; i++) {
      let dsi = downstarting[i][0];
      let dsj = downstarting[i][1];
      let str = "";
      while (dsi < grid.length && grid[dsi][dsj] != "") {
        str += grid[dsi][dsj];
        dsi++;
      }
      if (str == downwords[i]) {
        ans++;
      }
    }
    for (let i = 0; i < acrosswords.length; i++) {
      let aci = acrossstarting[i][0];
      let acj = acrossstarting[i][1];
      let str2 = "";
      while (acj < grid[0].length && grid[aci][acj] != "") {
        str2 += grid[aci][acj];
        acj++;
      }
      if (str2 === acrosswords[i]) {
        ans++;
      }
    }
    setGrid(info.grid);
    const { name, teamname, regno } = await JSON.parse(
      localStorage.getItem("user")
    );
    const data = await axios.post(upload, {
      name,
      teamname,
      regno,
      marks: ans,
    });
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    if (data.data.status === false) {
      toast.error(data.data.msg, toastOptions);
    } else {
      localStorage.removeItem("user");
      navigate("/thankyou");
    }
  };
  const index = info.index;
  return (
    <>
      <Container>
        <div className="crossDiv">
          <div className="container ">
            <div className="Questions div1">
              {index === 0 ? (
                <div>
                  ACROSS: <br />
                  1. Elevate awareness through an enlightening webinar on
                  combating substance
                  <br />
                  4. ISTE's electrical event in graVITas'23
                  <br />
                  6. Our google forms quiz which was an insight on data
                  structure and algorithm
                  <br />
                  8. Tuesday's Instagram story unveiled the beauty of
                  cutting-edge technologies
                  <br />
                  10. Name of the hackathon <br /> <br />
                  DOWN: <br />
                  2. Empower buyers to shop locally with a QR-scanning webapp
                  marvel <br />
                  3. Effortless dining: App updates restaurant seating, ensuring
                  comfort and efficiency <br />
                  5. Immersive workshop delving into designing, analyzing data
                  structures, algorithms—learning from scratch <br />
                  7. At Gravitas'22, we crafted an electrifying bot for our
                  thrilling event. What was the name of that event <br />
                  9. our event in RIVIERA'23.`
                </div>
              ) : index === 1 ? (
                <div>
                  {" "}
                  ACROSS: <br />
                  3. Immersive workshop delving into designing, analyzing data
                  structures, algorithms—learning from scratch <br />
                  4. ISTE-VIT's grand tech fest: workshops, hackathon—where
                  innovation takes flight! <br />
                  5. ISTE's electrical event in graVITas'23 <br />
                  7. Nishchay Singh's webinar: Secure data insights, online
                  threat defense, Google efficiency! <br />
                  8. The hackathon's key supporter: our esteemed title sponsor{" "}
                  <br />
                  10. Gravitas'23 workshop: Crafting a captivating game,
                  starting from absolute scratch.. <br /> <br />
                  DOWN: <br />
                  1. Empower buyers to shop locally with a QR-scanning webapp
                  marvel. <br />
                  2. ISTE-VIT's initiative: inspiring young minds through
                  knowledge in school outreach <br />
                  6. Gravitas 2023: A spectacle event featuring ideation, code
                  challenges, lightning research, and tech quizzing <br />
                  9. Gravitas'22 workshop: Crafting NFTs from scratch and
                  mastering website minting
                </div>
              ) : (
                <div>
                  ACROSS: <br />
                  3. At Gravitas'23, ISTE sparkled with an event crafting health
                  innovation. <br />
                  5. Gravitas '22: Electrifying competition embracing tech,
                  management, design, aptitude—student excellence unleashed!{" "}
                  <br />
                  6. The hackathon's key supporter: our esteemed title sponsor{" "}
                  <br />
                  8. Nishchay Singh's webinar: Secure data insights, online
                  threat defense, Google efficiency! <br />
                  9. A remarkable fusion: three dynamic workshops and an
                  exhilarating 36-hour hackathon. <br />
                  10. Horizon '21 workshop: Photoshop, craft UI/UX with Adobe
                  XD—launch design career! <br /> <br />
                  DOWN: <br />
                  1.Our google forms quiz which was an insight on data structure
                  and algorithm <br />
                  2. Gravitas'23 workshop: Crafting a captivating game, starting
                  from absolute scratch. <br />
                  4. Empower buyers to shop locally with a QR-scanning webapp
                  marvel. <br />
                  7. Gravitas'23 workshop: Crafting a captivating game, starting
                  from absolute scratch.
                </div>
              )}
            </div>
            <form name="CROSSWORDRESULT" onSubmit={calculateMarks}>
              <div className="crossword div2">
                {grid.map((row, rowIndex) => (
                  <div className="row" key={rowIndex}>
                    {row.map((cell, colIndex) =>
                      arr[rowIndex][colIndex] === "-" ? (
                        <input
                          key={`${rowIndex}-${colIndex}`}
                          style={{ opacity: 0 }}
                          className="cell"
                        />
                      ) : (
                        <input
                          key={`${rowIndex}-${colIndex}`}
                          maxLength="1"
                          value={
                            isNaN(parseInt(arr[rowIndex][colIndex]))
                              ? cell
                              : arr[rowIndex][colIndex]
                          }
                          disabled={!isNaN(parseInt(arr[rowIndex][colIndex]))}
                          onChange={(e) => handleChange(rowIndex, colIndex, e)}
                          onKeyDown={(e) =>
                            handleKeyPress(e, rowIndex, colIndex)
                          }
                          className="cell"
                          id={`${rowIndex}-${colIndex}`}
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
              <button className="button" onClick={calculateMarks}>
                {" "}
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-image: url(${backgroundImage});
  background-size: cover;
  .container {
    align-items: center;
    color: white;

    display: flex;
    gap: 2rem;
  }
  .cell {
    width: 1rem;
    height: 1rem;
    font-size: 0.8rem;
    text-align: center;
  }
  .Questions {
    font-size: 1.2rem;
    font-size: 1.2rem;
    width: 40%;
  }
  .crossword {
    width: 60%;
  }
  .row {
    display: flex;
  }
  .button {
    margin-top: 1rem;
  }
`;
