import React, { Component } from 'react'
import {Row, Col, Jumbotron} from 'reactstrap'

export default class Register extends Component {
  render() {
    return (
      <>
        <Row>
          <Col md={6}>
            <Jumbotron>
              <h1>Welcome!</h1>
              <p>Please login first</p>
            </Jumbotron>
          </Col>
          <Col md={6}>
          
          </Col>
        </Row>
      </>
    )
  }
}
