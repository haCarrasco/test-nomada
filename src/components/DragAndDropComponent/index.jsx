import * as React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Row, Col, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;
const { Dragger } = Upload;

const DragAndDropComponent = () => {
  const navigate = useNavigate();
  const name = "file";
  const action = "https://whois.nomada.cloud/upload";
  const headers = {
    Nomada: process.env.REACT_APP_NOMADA_KEY,
  };


  const onChange = (info) => {
    const { status } = info.file;

    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
      const { response } = info.file;
      const { actorName } = response;
      if(actorName !== ""){
        const actorNameUnderscore = actorName.split(" ").join("_");
        navigate(`/infoActors/${actorNameUnderscore}`);
      } else {
        message.error("No se pudo detectar actor en la imagen")
      }
      

    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div
      className="container-main"
      style={{
        background: "#d9d9d9",
        height: "800px",
        width: 1400,
        padding: "180px 0 0 200px",
        margin: 0,
        textAlign: "center",
      }}
    >
      <Col
        lg={{ span: 18, offset: 2 }}
        xs={{ span: 8, offset: 2 }}
        style={{
          background: "white",
          width: "700px",
          height: "300px",
          justifyContent: "center",
          paddingTop: "40px",
        }}
      >
        <Title level={2}>¿Quien es ese actor?</Title>
        <Content>
          <Row>
            <Col lg={{ span: 18, offset: 3 }} xs={{ span: 15, offset: 4 }}>
              <Dragger
                onChange={onChange}
                name={name}
                action={action}
                headers={headers}
                multiple={false}
                accept={"image/*"}
                beforeUpload={(file) => {
                  const isImage = /image\/*/.test(file.type);
                  if (!isImage) {
                    message.error(`${file.name} is not an image file`)
                  } 
                  return isImage;
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Haz click o arrastra una imagen
                </p>
                <p className="ant-upload-hint">
                  Selecciona la foto de un actor famoso para conocer quien es y
                  en que peliculas ha salido
                </p>
              </Dragger>
            </Col>
          </Row>
        </Content>
      </Col>
    </div>
  );
};

export default DragAndDropComponent;
