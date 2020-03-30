import React, {Component} from 'react'
import config from '../../utils/config'
import axios from 'axios'

import {
  Table, Container, Button,
  Row, Col, Form, FormGroup,
  Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

import {Link} from 'react-router-dom'

class Schedule extends Component{
  constructor(props){
    super(props)
    this.state = {
      schedules: [],
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
      this.setState({schedules:data, pageInfo, startFrom: this.state.startFrom + pageInfo.perPage})
    }
    this.prevData = async() => {
      const results = await axios.get(this.state.pageInfo.prevLink)
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({schedules:data, pageInfo, startFrom: this.state.startFrom - pageInfo.perPage})
    }
    this.searchSchedule = async (e) => {
      const results = await axios.get(config.APP_BACKEND.concat(`schedule?search[departure_time]=${e.target.value}`))
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({schedules:data, pageInfo})
    }
    this.sortSchedule = async () => {
      this.setState({sort:(this.state.sort?'':1)})
      const results = await axios.get(config.APP_BACKEND.concat(`schedule?sort[schedule]=${this.state.sort}`))
      const {data} = results.data
      const {pageInfo} = results.data
      this.setState({schedules:data, pageInfo})
    }
    this.deleteData = async()=> {
      const results = await axios.delete(config.APP_BACKEND.concat(`schedule/${this.state.selectedId}`))
      if(results.data.success){
        console.log('test')
        const newData = await axios.get(config.APP_BACKEND.concat('schedule'))
        const {data} = newData.data
        const {pageInfo} = newData.data
        this.setState({schedules:data, pageInfo, showModal: false, selectedId:0})
      }else {
        console.log(results.data)
      }
    }
  }
  async componentDidMount(){
    const results = await axios.get(config.APP_BACKEND.concat('schedule'))
    const {data} = results.data
    const {pageInfo} = results.data
    this.setState({schedules:data, pageInfo})
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
                          <Input type='search' placeholder='input your schedule' onChange={this.searchSchedule} />
                        </div>
                      </td>
                      <td className='text-right'>
                      <Link to='/schedule/add'><button type='submit' className='btn btn-success buttonAdd'> Add Schedule</button></Link>
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
                <th onClick={this.sortSchedule}>Time Go</th>
                <th>Time Arrive</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.state.schedules.length && this.state.schedules.map((v,i)=>(
                <tr key={this.state.schedules[i].id.toString()}>
                  <td>{(this.state.startFrom + i)}</td>
                  <td>{this.state.schedules[i].departure_time}</td>
                  <td>{this.state.schedules[i].arrive_time}</td>
                  <td>
                    <Link className='buttonEdit' to={`/schedule/${this.state.schedules[i].id}`}>
                    <i class="fas fa-edit"></i>
                    </Link>
                    <button className='buttonDelete' onClick={()=>this.setState({showModal: true, selectedId: this.state.schedules[i].id})} >
                    <i class="far fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col md={12} className='text-right'>
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
          <ModalHeader>Delete Schedule</ModalHeader>
          <ModalBody>Are u sure want to delete schedule?</ModalBody>
          <ModalFooter>
            <Button color='success' onClick={this.deleteData}>OK</Button>
            <Button color='danger' onClick={()=>this.setState({showModal: false, selectedId: 0})}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Schedule