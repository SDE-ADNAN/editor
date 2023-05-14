/* eslint-disable no-unused-vars */
import jsPDF from "jspdf";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { API_URL } from "../../../constant/apiURL";
import "./Download.css";
import DownloadPNG from "./DownloadPNG.png";
import DownloadPDF from "./DownloadPDF.png";

const Download = (props) => {
  const [show, setShow] = useState(false);
  const [dataURL, setDataURL] = useState("");
  const [fileName, setFileName] = useState("");

  const token = useSelector((state) => state.auth.token);
  const type = "ER";
  const history = useHistory();

  const downloadPNGURI = (uri, name) => {
    var link = document.createElement("a");
    link.type = "application/pdf";
    link.download = name;
    link.href = uri;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDFURI = (uri, name) => {
    // var link = document.createElement("a");

    var doc = new jsPDF("p", "mm");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(uri, "PNG", 0, 0, width, height);

    doc.save(`${name}.pdf`);

    var blob2 = doc.output("blob");
    console.log(blob2);

    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    return blob2;
  };
  const downloadPNG = () => {
    var dataURL = props.dataURL();
    downloadPNGURI(dataURL, fileName);
    setShow(false);
  };

  const downloadPDF = () => {
    if (fileName.length >= 1) {
      var dataURL = props.dataURL();
      var file = downloadPDFURI(dataURL, fileName);
      setShow(false);

      let formData = new FormData();

      const isDuplex = false;
      formData.append("pamphlet_type", type);
      formData.append("is_duplex", isDuplex);
      formData.append("pamphlet_name", fileName);
      // formData.append("editor_file_str", dataURL);
      formData.append("image1", file);

      fetch(`${API_URL}campaign/pamphlets/design-create/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          // history.push("/campaign/create");
          // return res.json().then((data) => {
          console.log("template image saved");
          // });
        }
      });
    } else {
      alert("pls provide FileName");
    }
  };

  const handleChange = (e) => {
    // e.preventDefault();
    if (fileName !== null) {
      setFileName(e.target.value);
      // downloadPDF();
    } else {
      alert("pls provide FileName");
    }
  };

  const openModal = () => {
    setShow(!show);
    setDataURL(props.dataURL());
  };

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <button
        className="botton-save"
        onClick={() => {
          if (props.state.selectedObject === null) {
            openModal();
          } else {
            alert("please deselect the selected object");
          }
        }}
      >
        Save
      </button>
      <Modal
        className="download"
        show={show}
        onHide={() => setShow(!show)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>Save File</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#EAF3FF" }}>
          <div className="download-flex">
            <img
              className="modal-image"
              src={dataURL}
              alt="download"
              // width={"390vw"}
            />
            <div className="m-flex">
              {/* <Form.Group> */}
              <div>
                <div>
                  <Form.Label className="btn-label">
                    <h4>File Name</h4>
                  </Form.Label>
                  <Form.Control
                    className="form-control-size"
                    name="name"
                    type="text"
                    placeholder="Name your design"
                    value={fileName}
                    onChange={(e) => {
                      handleChange(e);
                      e.preventDefault();
                    }}
                    // onSubmit={downloadPDF}
                  ></Form.Control>
                </div>

                {/* <div style={{ margin: "30px", marginLeft: "0px" }}>
                  <h4>Select File Format</h4>
                </div>
                <div></div> */}

                <Button
                  className="btn-1st btn-flex "
                  // variant="primary"
                  type="submit"
                  onClick={downloadPDF}
                  block
                >
                  <div style={{ width: "26px" }}>
                    <img src={DownloadPDF} alt="downloadpdf"></img>
                  </div>
                  <div className="btn-label">Save as PDF</div>
                  {/* <div className="recomended">Recommended</div> */}
                </Button>
              </div>
              <div style={{ color: "black", fontsize: "1.2em", width: "80%" }}>
                <span style={{ color: "red" }}>**</span> Your pamphlet will be
                saved in choose pamphlet list on Campaign Creation page{" "}
                <span style={{ color: "red" }}>**</span>
              </div>
              <div>
                <Button
                  className="btn-1st btn-flex"
                  // variant="primary"
                  type="submit"
                  onClick={downloadPNG}
                  block
                >
                  <div style={{ width: "26px" }}>
                    <img src={DownloadPNG} alt="downloadpng"></img>
                  </div>
                  <div className="btn-label">Save as PNG</div>
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Download;
