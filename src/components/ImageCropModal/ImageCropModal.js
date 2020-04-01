import React, { useState, useContext } from "react";
import Modal from "react-modal";
import "./ImageCropModal.scss";
import DropNCrop from "@synapsestudios/react-drop-n-crop";
import "@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css";
import { AppContext } from "../../App";

const customStyles = {
  content: {
    width: "90%",
    height: "90%",
    zIndex: "50",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

function ImageCropModal() {
  const { modalIsOpen, setModalIsOpen, setBackImage } = useContext(AppContext);

  const [state, setstate] = useState({
    result: null,
    filename: null,
    filetype: null,
    src: null,
    error: null
  });

  const onChange = value => {
    setstate(value);
  };

  return (
    <Modal isOpen={modalIsOpen} style={customStyles}>
      <button className="close-modal" onClick={() => setModalIsOpen(false)}>
        X
      </button>
      <DropNCrop
        onChange={onChange}
        value={state}
        cropperOptions={{ aspectRatio: 1 / 1 }}
      />
      <button
        className="save-image"
        onClick={() => {
          setModalIsOpen(false);
          setBackImage(state.result);
          setstate({
            result: null,
            filename: null,
            filetype: null,
            src: null,
            error: null
          });
        }}
      >
        Sacuvaj sliku
      </button>
    </Modal>
  );
}

export default ImageCropModal;
