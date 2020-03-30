import React from 'react'
import {BrowserRouter, Router, Switch, Route} from 'react-router-dom'
import history from './utils/history'

/* Custom Component */
import Navbar from './components/Navbar'
import NavbarMenu from './components/NavBarMenu'
import Footer from './components/Footer'

/* Pages */
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users/Users'
import Agents from './pages/Agents/Agent'
import Buses from './pages/Bus/Buses'
import EditBus from './pages/Bus/Edit'
import CreateBus from './pages/Bus/CreateBus'
import Routes from './pages/Route/Routes'
import EditRoutes from './pages/Route/Edit'
import Schedules from './pages/Schedule/Schedules'
import EditSchedules from './pages/Schedule/Edit'
import Prices from './pages/Price/Prices'
import EditPrices from './pages/Price/Edit'
import PostPrice from './pages/Price/Post'
import NotFound from './components/NotFound'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      isLogin: false
    }
    this.checkLogin = () => {
      if(localStorage.getItem('token')){
        this.setState({isLogin: true})
      }else{
        this.setState({isLogin: false})
      }
    }
  }
  componentDidMount(){
    this.checkLogin()
  }
  render(){
    return(
      <BrowserRouter>
        <Router history={history}>
          {this.state.isLogin ? 
          <Navbar isLogin={this.state.isLogin} check={()=>this.checkLogin()} /> 
          : <NavbarMenu isLogin={this.state.isLogin} check={()=>this.checkLogin()} />}
          <Switch>
            <Route path='/' exact render={(props)=><Home {...props}/>} />
            <Route path='/login' render={(props)=><Login {...props} check={()=>this.checkLogin()}  />} exact />
            <Route path='/dashboard' render={(props)=><Dashboard {...props} />} exact></Route>
            <Route path='/users' exact render={(props)=><Users {...props}/>} />
            <Route path='/agents' exact render={(props)=><Agents {...props}/>} />
            <Route path='/bus' exact render={(props)=><Buses {...props}/>} />
            <Route path='/bus/add' exact render={(props)=><CreateBus {...props}/>} />
            <Route path='/bus/:id' exact render={(props)=><EditBus {...props}/>} />
            <Route path='/route' exact render={(props)=> <Routes {...props}/>} />
            <Route path='/route/:id' exact render={(props)=> <EditRoutes {...props}/>} />
            <Route path='/schedule' exact render={(props)=> <Schedules {...props}/>} />
            <Route path='/schedule/:id' exact render={(props)=> <EditSchedules {...props}/>} />
            <Route path='/transaction' exact render={(props)=> <Prices {...props}/>} />
            <Route path='/transaction/:id' exact render={(props)=> <EditPrices {...props}/>} />
            <Route path='/transaction/add' exact render={(props)=> <PostPrice {...props}/>} />
            <Route path="*" exact render={(props)=> <NotFound {...props}/>} />
          </Switch>
          <Footer/>
        </Router>
      </BrowserRouter>
    )
  }
}

export default App
