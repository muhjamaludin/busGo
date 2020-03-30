import React, { Component } from 'react'
import { Form, FormGroup, Input } from 'reactstrap'
import { Link } from 'react-router-dom'

class InputSearch extends Component {
    render () {
        return (
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
                      <Link to='/bus/create'><button type='submit' className='btn btn-success buttonAdd'> Add Bus</button></Link>
                      </td>
                    </tr>
                  </table>                 
                </FormGroup>
            </Form>
        )
    }
}
