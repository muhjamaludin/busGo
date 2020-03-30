import React, { Component } from 'react'
import {
  Row, Col, Jumbotron, Container,
  Form, FormGroup, Input, Button, Label,
  Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Loading from '../components/Loading'
import config from '../utils/config'


export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      showModal: false,
      isLoading: false
    }
    this.setUsername = (e) => {
      this.setState({
        username: e.target.value
      })
    }
    this.setPassword = (e) => {
      this.setState({
        password: e.target.value
      })
    }
    // this.onFormChange = (e,form) => {
    //   this.setState({[form]:e.target.value})
    // }
    this.onLogin = async (e) => {
      e.preventDefault()
      this.setState({isLoading:true})
      let params = {
        username: this.state.username,
        password: this.state.password
      }

      const connection = await axios.post(config.APP_BACKEND.concat('auth/login'), params)
      console.log(connection)

      if(connection.data.success){
        setTimeout(()=>{
          this.setState({isLoading: false},()=>{
            localStorage.setItem('token', 'true')
            this.props.check()
            this.props.history.push('/dashboard')
          })
        },1000)
      }else{
        this.setState({showModal: true, isLoading:false})
      }
    }
    this.checkLogin = () => {
      if(localStorage.getItem('token')){
        this.props.history.push('/dashboard')
      }
    }
  }
  componentDidMount(){
    this.checkLogin()
  }
  render() {
    return (
      <>
      <div style={{backgroundColor: 'beige', height: '100vh'}}>
      <Container className='mt-4'>
        <Row>
          <Col md={4}></Col>
          <Col md={4} className='text-center mt-4 bg-white'>
            <Form onSubmit={e=>this.onLogin(e)}>
            
            <FormGroup>
                <img src="https://image.flaticon.com/icons/svg/235/235861.svg" style={{width: '100px', height: 'auto'}} />
                <p style={{fontFamily: 'Helvetica'}}>Travel with BusGo Travel Apps</p>
              </FormGroup>
              <FormGroup>
                <Label>Username</Label>
                <Input type='text' onChange={(e)=> this.setUsername(e)} />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type='password' onChange={(e)=> this.setPassword(e,)} />
              </FormGroup>
              <Row>
                <Col md={12} className='text-center'>
                  <Button type='submit' color='success' style={{width: '200px'}}>Sign In</Button>
                </Col>
              </Row>
              <Row>
                <Col md={12} className='text-center mt-2'></Col>
              </Row>
            </Form>
          </Col>
          <Col md={4}></Col>

        </Row>
      </Container>
      <Modal isOpen={this.state.showModal}>
        <ModalHeader>Warning</ModalHeader>
        <ModalBody>
          Wrong Username or Password
        </ModalBody>
        <ModalFooter>
          <Button autoFocus onClick={()=>this.setState({showModal: false})} color='primary'>OK</Button>
        </ModalFooter>
      </Modal>
      {this.state.isLoading && (<Loading/>)}
      </div>
      </>
    )
  }
}
