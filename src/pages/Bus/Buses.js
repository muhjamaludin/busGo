import React, {Component} from 'react'
import config from '../../utils/config'
import axios from 'axios'

import {
  Table, Container, Button,
  Row, Col, Form, FormGroup,
  Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import {Link} from 'react-router-dom'
import '../../styles/search.css'
import '../../styles/Button.css'

class Bus extends Component{
  constructor(props){
    super(props)
    this.state = {
      buses: [],
      pageInfo: {
        page: 0,
        perPage: 0,
        totalData: 0,
        totalPage: 0,
        nextLink: null,
        prevLink: null
      },
      currentPage: 1,
      sort: 0,
      showModal: false,
      selectedId: 0,
      startFrom: 1
    }

    this.nextData = async() => {
      const results = await axios.get(this.state.pageInfo.nextLink)
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({buses:data, pageInfo, startFrom: this.state.startFrom + pageInfo.perPage})
    }
    this.prevData = async() => {
      const results = await axios.get(this.state.pageInfo.prevLink)
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({buses:data, pageInfo, startFrom: this.state.startFrom - pageInfo.perPage})
    }
    this.searchBus = async (e) => {
      const results = await axios.get(config.APP_BACKEND.concat(`bus?search[bus_name]=${e.target.value}`))
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({buses:data, pageInfo})
    }
    this.sortBus = async () => {
      this.setState({sort:(this.state.sort?'':1)})
      const results = await axios.get(config.APP_BACKEND.concat(`bus?sort[bus_name]=${this.state.sort}`))
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({buses:data, pageInfo})
    }
    this.deleteData = async()=> {
      const results = await axios.delete(config.APP_BACKEND.concat(`bus/${this.state.selectedId}`))
      if(results.data.success){
        console.log('test')
        const newData = await axios.get(config.APP_BACKEND.concat('bus'))
        const {data} = newData.data
        const {pageInfo} = newData.data
        this.setState({buses:data, pageInfo, showModal: false, selectedId:0})
      }else {
        console.log(results.data)
      }
    }
  }
  
  async componentDidMount () {
    const results = await axios.get(config.APP_BACKEND.concat('bus'))
    const {data} = results.data
    const {pageInfo} = results.data
    this.setState({buses:data, pageInfo})
    console.log(data)
  }

  render(){
    return(
      <>
        <Container>
          <Row>
            <Col md={10}>
              <Form>
                <FormGroup>
                  <table style={{width: '100%'}}>
                    <tr>
                      <td style={{width: '80%'}}>
                        <div className='searchbar'>
                          <i class="fas fa-search"></i>
                          <Input type='search' placeholder='input your bus' onChange={this.searchBus} />
                        </div>
                      </td>
                      <td className='text-right'>
                      <Link to='/bus/add'><button type='submit' className='btn btn-success buttonAdd'> Add Bus</button></Link>
                      </td>
                    </tr>
                  </table>                 
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Table>
            <thead>
              <tr>
                <th>No</th>
                <th onClick={this.sortBus}>Bus Name</th>
                <th>Bus Seat</th>
                <th>Class Bus</th>
                <th>Departure</th>
                <th>Destination</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.state.buses.length && this.state.buses.map((v,i)=>(
                <tr >
                  <td>{(this.state.startFrom + i)}</td>
                  <td>{this.state.buses[i].bus_name}</td>
                  <td>{this.state.buses[i].bus_seat}</td>
                  <td>{this.state.buses[i].classBus}</td>
                  <td>{this.state.buses[i].departure}</td>
                  <td>{this.state.buses[i].destination}</td>
                  <td>
                    <Link className='buttonEdit' to={`/bus/${this.state.buses[i].id}`}>
                    <i class="fas fa-edit"></i>
                    </Link>
                    <button className='buttonDelete' onClick={()=>this.setState({showModal: true, selectedId: this.state.buses[i].id})} >
                    <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col md={12} className='text-right '>
                Page {this.state.pageInfo.page}/{this.state.pageInfo.totalPage} Total Data {this.state.pageInfo.totalData} Limit {this.state.pageInfo.perPage}
            </Col>
          </Row>
          <Row>
            <Col md={6} className='text-center'>
              <Button disabled={this.state.pageInfo.prevLink ? false : true} onClick={this.prevData} className='previous'>&#8249;</Button>
            </Col>
            <Col md={6} className='text-center'>
              <Button disabled={this.state.pageInfo.nextLink ? false : true} onClick={this.nextData} className='next'>&#8250;</Button>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Delete Bus</ModalHeader>
          <ModalBody>Are u sure want to delete bus?</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.deleteData}>OK</Button>
            <Button color='danger' onClick={()=>this.setState({showModal: false, selectedId: 0})}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Bus