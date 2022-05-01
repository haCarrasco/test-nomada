import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Row, Col, Layout } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider } from "antd";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ListMovies from "../../components/ListMovies/Index";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Meta } = Card;

const gender = { "1": "Mujer", "2": "Hombre" }

const InfoActors = () => {
  const params = useParams();
  const actorNameUnderscore = params.actorName;
  const [actorInfo, setActorInfo] = useState({});
  const [movieInfo, setMovieInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const actorName = actorNameUnderscore.split("_").join(" ");
    const getActorInfo = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1&include_adult=false&query=${actorName}`
      );
      if (res.status === 200) {
        const resActorInfo = res.data.results[0];
        const resMovieInfo = resActorInfo.known_for;
        setActorInfo(resActorInfo);
        setMovieInfo(resMovieInfo);

      }
    };

    getActorInfo();
  }, [actorNameUnderscore]);

  const returnNavigate = () => {
    navigate(`/`);
  }

  return (
    <div
      className="info-container"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "1400px",
        background: "#d9d9d9",
        height: "800px",
        padding: "70px 195px 0 80px",
      }}
    >
      <Col
        lg={{ span: 21 }}
        xs={{ span: 8, offset: 2 }}
        style={{
          background: "white",
          width: "720px",
          height: "600px",
          justifyContent: "center",
          paddingTop: "15px",
          paddingRight: "0px",
        }}
      >
        <Content>
          <Row className="head ant-col-24" style={{ display: "flex" }}>
            <Button onClick={() => returnNavigate()}
              className="btn"
              type="primary"
              style={{ margin: "10px 0 0px 20px" }}
            >
              <ArrowLeftOutlined /> Regresar
            </Button>
            <Divider />
            <Layout>
              <Card
                hoverable
                style={{
                  width: 200,
                  marginLeft: 40,
                  marginRight: -32,
                  marginTop: -24,
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
                cover={
                  <img
                    alt="example"
                    src={`https://image.tmdb.org/t/p/w500/${actorInfo.profile_path}`}
                  />
                }
              >
          
              </Card>
              <h1>{actorInfo.name}</h1>
              <div>{gender[actorInfo.gender]}</div>
              <h4 >Popularidad: {actorInfo.popularity}</h4>
            </Layout>

            <ListMovies listMovies={movieInfo} />
          </Row>
        </Content>
      </Col>
    </div>
  );
};

export default InfoActors;
