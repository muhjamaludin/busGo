import React, {Component} from 'react'
import axios from 'axios'
import config from '../../utils/config'

import qs from 'qs'

import {
  Container, Form, FormGroup,
  Row, Col, Input, Label,
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

class Edit extends Component{
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
    const results = await axios.get(config.APP_BACKEND.concat(`users/${this.props.match.params.id}`))
    const {data} = results.data
    this.setState({id:this.props.match.params.id, data})
    this.changeData = (e, form) => {
      const {data} = this.state
      data[form] = e.target.value 
      this.setState({data})
    }
    this.submitData = async (e)=>{
      e.preventDefault()
      this.setState({isLoading: true})
      const submit = await axios.patch(config.APP_BACKEND.concat(`users/${this.props.match.params.id}`),qs.stringify(this.state.data))
      if(submit.data.success){
        this.setState({isLoading: false, showModal: true, modalMessage: submit.data.msg})
      }else{
        this.setState({modalMessage: submit.data.msg})
      }
    }
    this.dismissModal = () => {
      this.setState({showModal: false})
      this.props.history.push('/about')
    }
  }
  render(){
    const {id,isLoading} = this.state
    const {username, is_active, is_verified} = this.state.data
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
              <Form>
                <FormGroup>
                  <Label>Username</Label>
                  <Input type='text' value={username} onChange={(e) => this.changeData(e, 'username')} />
                </FormGroup>
                <FormGroup>
                  <Label>Is Active</Label>
                  <Input type='text' value={is_active} onChange={(e) => this.changeData(e, 'is_active')} />
                </FormGroup>
                <FormGroup>
                  <Label>Is Verified</Label>
                  <Input type='text' value={is_verified} onChange={(e) => this.changeData(e, 'is_verified')} />
                </FormGroup>
                <Button onClick={e=>this.submitData(e)} color='success'>Save</Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
    )
  }
}

export default Edit