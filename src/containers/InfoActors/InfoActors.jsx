import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Row, Col, Layout } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider } from 'antd';
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import  ListMovies  from "../../components/DragAndDropComponent/ListMovies";

const { Content } = Layout;

const InfoActors = () => {
  const params = useParams();
  const actorNameUnderscore = params.actorName;
  const [actorInfo, setActorInfo] = useState({});
  
  
  useEffect(() => {
    const actorName = actorNameUnderscore.split("_").join(" ");
    const getActorInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${actorName}`
      );
      if (res.status === 200) {
        const resActorInfo = res.data.results[0];
        setActorInfo(resActorInfo);
      }
    };

    getActorInfo();
  }, [actorNameUnderscore]);

  

  return (
    <div
      className="info-container"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        background: "#d9d9d9",
        height: "800px",
        padding: "70px 280px 0 80px",
      }}
    >
      <Col
        lg={{ span: 21 }}
        xs={{ span: 8, offset: 2 }}
        style={{
          background: "white",
          width: "600px",
          height: "600px",
          justifyContent: "center",
          paddingTop: "15px",
          paddingRight: "0px",
        }}
      >
        <Content>
          <Row className="head ant-col-24" style={{ display: "flex" }}>
            <Button
              className="btn"
              type="primary"
              style={{ margin: "10px 0 0px 20px" }}
            >
              <ArrowLeftOutlined /> Regresar
            </Button>
            <Divider />
            <Card
              hoverable
              style={{
                width: 200,
                height: 250,
                marginLeft: 60,
                marginRight: -51,
                border: "1px solid rgba(140, 140, 140, 0.35)",
              }}
              cover={<img alt="example" src={actorInfo.poster_path} />}
            ></Card>
            {actorInfo.id}

            <ListMovies />
          </Row>
        </Content>
      </Col>
    </div>
  );
};

export default InfoActors;
