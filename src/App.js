import React, { useState, createContext } from "react";
import frame from "./assets/Frame.png";
import couple from "./assets/happy_couple.jpg";
import "./App.scss";
// Components
import ImageCropModal from "./components/ImageCropModal/ImageCropModal";
// Libs
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
// Api
import { calcByNames } from "./api/api";
// Context
export const AppContext = createContext({});


function App() {
  const [firstname, setfirstname] = useState("");
  const [secondname, setsecondname] = useState("");
  const [percentage, setpercentage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [backImage, setBackImage] = useState(couple);

  const calculate = () => {
    calcByNames(firstname, secondname).then(res => {
      setpercentage(res.percentage);
    });
  };

  const saveImage = () => {
    html2canvas(document.querySelector("#image-frame")).then(function(canvas) {
      canvas.toBlob(blob => {
        saveAs(blob, `${firstname}+${secondname}`);
      });
    });
  };

  return (
    <AppContext.Provider
      value={{
        modalIsOpen: modalIsOpen,
        setModalIsOpen: setModalIsOpen,
        setBackImage: setBackImage
      }}
    >
      <>
        <ImageCropModal />

        <div className="app">
          <div className="input-text">
            <h1>Okvir Ljubavi</h1>
            <h5>
              Pripremili smo zabavan ljubavni test, koji koristeći numerologiju
              računa koliko ste kompatibilni i stvoreni jedno za drugo. I sve to
              na osnovu vaših imena!
            </h5>
            <input
              placeholder="Tvoje ime"
              value={firstname}
              onChange={e => setfirstname(e.target.value)}
            />
            <input
              placeholder="Njegovo / Njeno ime"
              value={secondname}
              onChange={e => setsecondname(e.target.value)}
            />
            <button onClick={() => calculate()}>Izračunaj</button>
          </div>
          <div className="output-frame">
            <div id="image-frame">
              <div className="result">
                {percentage && <h3>{percentage}%</h3>}
                <h6>{window.location.origin}</h6>
              </div>

              <img className="image-frame" src={frame} alt="frame" />
              <div className="image-back">
                <img src={backImage ? backImage : couple} alt="couple" />
              </div>
            </div>
            <button onClick={() => setModalIsOpen(true)}>
              Ubaci Svoju Sliku
            </button>
            <button onClick={() => saveImage()}>Sačuvaj Sliku</button>
          </div>
        </div>
      </>
    </AppContext.Provider>
  );
}

export default App;
