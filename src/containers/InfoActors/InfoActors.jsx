import React from 'react'
import { Component } from 'react';
import { Card } from "antd";
import { Row, Col, Layout } from 'antd'

const { Content } = Layout;


const { Meta } = Card;

class InfoActors extends Component  {
   
  render() {
    return (
      <div
        className="info-container"
        style={{
          background: "#d9d9d9",
          height: "800px",
          padding: "50px 0 0 170px",
        }}
      >
        <Col
          lg={{ span: 18, offset: 2 }}
          xs={{ span: 8, offset: 2 }}
          style={{
            background: "white",
            width: "800px",
            height: "600px",
            justifyContent: "center",
            paddingTop: "40px",
          }}
        >
          
          <Content>
            <Row>
              <Col lg={{ span: 18, offset: 3 }} xs={{ span: 15, offset: 4 }}>
                <Card
                  hoverable
                  style={{ width: 400, height: 200 }}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                >
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
            </Row>
          </Content>
        </Col>
      </div>
    );
  }
}

export default InfoActors;