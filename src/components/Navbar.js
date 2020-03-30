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
           <Link to={'/agents'}> <NavLink className='text-succes'>Agent Bus <i class="fas fa-user-tie"></i></NavLink> </Link>            
           <Link to={'/bus'}> <NavLink className='text-succes NavbarMenuBus'>Bus <i class="fas fa-bus-alt"></i></NavLink> </Link>
           <Link to={'/route'}> <NavLink className='text-succes NavbarMenuRoute'>Route <i class="fas fa-route"></i></NavLink> </Link>
           <Link to={'/schedule'}> <NavLink className='text-succes NavbarMenuSchedule'>Schedule <i class="far fa-clock"></i></NavLink> </Link>
           <Link to={'/transaction'}> <NavLink className='text-succes NavbarMenuPrice'>Price <i class="fas fa-dollar-sign"></i></NavLink> </Link>
           <Link to={'/users'}> <NavLink className='text-succes NavbarMenuUsers'>Users <i class="fas fa-users"></i></NavLink> </Link>

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
