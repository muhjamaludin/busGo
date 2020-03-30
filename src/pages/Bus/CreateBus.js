import React, {Component} from 'react'
import axios from 'axios'
import config from '../../utils/config'

import qs from 'qs'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
import '../../styles/input.css'

class CreateBus extends Component{
  constructor(props){
    super(props)
    this.state = {
      picture: '', 
      busName: '', 
      busSeat: '', 
      classBus: '', 
      idRoute: '',
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
    console.log(this.state.busName)
    this.submitData = async (e)=>{
      e.preventDefault()
      // this.setState({isLoading: true})
      const submit = await axios.post(config.APP_BACKEND.concat(`bus/add`),qs.stringify(this.state.data))
      
      if(submit.data.success){
        this.setState({isLoading: false})
        this.props.history.push('/bus')
      }else{
        this.setState({modalMessage: submit.data.msg})
      }
    }
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/bus')
    }
  }
    async componentDidMount () {
      const results = await axios.post(config.APP_BACKEND.concat(`bus/add`))
      const {data} = results.data
      console.log('adkasdmkadkas')
      console.log(data)
  }

  render(){

    return(
    <Container>
      
      
        <>
          <Modal isOpen={this.state.showModal}>
            <ModalHeader>Alert</ModalHeader>
            <ModalBody>
                {this.state.modalMessage}
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.dismissModal}>Ok</Button>
            </ModalFooter>
          </Modal>
        </>
      
      
        <>
          <Row>
            <Col md={12}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>New Bus</h2>
              <FormGroup>
                  <Label>Picture</Label>
                  <Input type='file' value={this.state.picture} onChange={(e) => this.setState({picture: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Bus Name</Label>
                  <Input type='text' onChange={(e) => this.setState({busName: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label className='numberInput'>Bus Seat</Label>
                  <Input type='number' value={this.state.busSeat} onChange={(e) => this.setState({busSeat: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Class Bus</Label>
                  <Input type='text' value={this.state.classBus} onChange={(e) => this.setState({classBus: e.target.value})} />
                </FormGroup>
                <FormGroup>
                  <Label>Code Route</Label>
                  <Input type='text' value={this.state.idRoute} onChange={(e) => this.setState({idRoute: e.target.value})} />
                </FormGroup>
                <Button type='submit'  color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
      
    </Container>
    )
  }
}

export default CreateBus