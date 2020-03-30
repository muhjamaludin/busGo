import React, { Component } from 'react'
import {
  Container,
  Row, Col, Jumbotron
} from 'reactstrap'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import BusImage from '../files/bus-clipart.png'

export default class Dashboard extends Component {
  constructor(props){
    super(props)
    this.checkToken = () => {
      if(!localStorage.getItem('token')){
        alert('You must login first')
        props.history.push('/login')
      }
    }
  }

  componentDidMount(){
    this.checkToken()
  }

  render() {
    return (
      <>
      <Container className='mt-4' style={{backgroundColor: 'burlywood'}}>
        <Jumbotron>
          <h3>Welcome back, Admiral!</h3>
        </Jumbotron>
        <Row>
          <Col md={3}>
            <img src={BusImage} alt='logo' style={{width: '200px', height: 'auto'}} />
          </Col>
          <Col md={9}>
            Reservations Data
          </Col>
        </Row>
        
      </Container> 
      <Footer/> 
      </> 
    )
  }
}
