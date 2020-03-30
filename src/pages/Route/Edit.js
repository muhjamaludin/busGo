import React, {Component} from 'react'
import axios from 'axios'
import config from '../../utils/config'

import qs from 'qs'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class EditRoute extends Component{
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      data: {},
      isLoading: false,
      showModal: false,
      modalMessage: ''
    }
  }
  async componentDidMount(){
    const results = await axios.get(config.APP_BACKEND.concat(`route/${this.props.match.params.id}`))
    const {data} = results.data
    console.log(data)
    this.setState({id:this.props.match.params.id, data})
    this.changeData = (e, form) => {
      const {data} = this.state
      data[form] = e.target.value 
      this.setState({data})
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      // this.setState({isLoading: true})
      const submit = await axios.patch(config.APP_BACKEND.concat(`route/${this.props.match.params.id}`),qs.stringify(this.state.data))
      console.log(submit.data)
      if(submit.data.success){
        this.setState({isLoading: false})
        this.props.history.push('/route')
      }else{
        this.setState({modalMessage: submit.data.msg})
      }
    }
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/route')
    }
  }
  render(){
    const {id,isLoading} = this.state
    const {departure, destination} = this.state.data
    return(
    <Container>
      {isLoading&&(
        <>
          Loading...
        </>
      )}
      {
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
      }
      {id && !isLoading &&(
        <>
          <Row>
            <Col md={12}>
              <Form className='mt-2' onSubmit={e=>this.submitData(e)}>
                <h2 className='text-dark text-center font-weight-bold'>Update Route</h2>
                <FormGroup>
                  <Label>Departure</Label>
                  <Input type='text' placeholder={this.state.data[0].departure} value={departure} onChange={(e) => this.changeData(e, 'departure')} />
                </FormGroup>
                <FormGroup>
                  <Label>Destination</Label>
                  <Input type='text' placeholder={this.state.data[0].destination} value={destination} onChange={(e) => this.changeData(e, 'destination')} />
                </FormGroup>
                <Button  color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
    )
  }
}

export default EditRoute