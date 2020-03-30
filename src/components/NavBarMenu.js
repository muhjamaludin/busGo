import React, { Component } from 'react'
import {
  Navbar as NavigationBar, NavbarBrand, NavbarToggler, NavLink,
  Collapse, Nav, NavItem
} from 'reactstrap'
import { Link } from 'react-router-dom'

import history from '../utils/history'
import styled from 'styled-components'
import Loading from '../components/Loading'
import '../styles/Navbar.css'

const Logout = styled('span')`
  cursor: pointer;
`

export default class Navbar extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: false
    }
    this.onLogout = () => {
      this.setState({isLoading: true},()=>{
        setTimeout(()=>{
          this.setState({isLoading: false}, ()=>{
            localStorage.removeItem('token')
            this.props.check()
            history.push('/login')
          })
        },1000)
      })
    }
  }
  render() {
    return (
      <>
        <NavigationBar color='light' expand='md' style={{fontFamily: 'Helvetica'}}>
          <NavbarBrand href='http://localhost:3000/dashboard' className='text-secondary'> BusGo Travel Apps </NavbarBrand>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className='ml-auto' navbar>
              {this.props.isLogin &&(
                <NavItem>
                  <Logout className='nav-link' onClick={this.onLogout}>Logout</Logout>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </NavigationBar>
        {this.state.isLoading && (<Loading/>)}
      </>
    )
  }
}
