import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props){
    super(props)
    this.checkToken = () => {
      if(!localStorage.getItem('token')){
        // alert('You must login first')
        props.history.push('/login')
      }else{
        props.history.push('/dashboard')
      }
    }
  }
  componentDidMount(){
    this.checkToken()
  }
  render() {
    return (
      <div>
        Homepage
      </div>
    )
  }
}
