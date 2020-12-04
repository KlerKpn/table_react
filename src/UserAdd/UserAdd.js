import React, { Component } from 'react'
import './UserAdd.css'

class UserAdd extends Component {

    state = {
        disabled: true,
        data: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }
    }

    handleChange = (target, value) => {
        let arrayCopy = { ...this.state.data }

        arrayCopy[target] = value
        this.setState({ data: arrayCopy })

        let toggle = Object.values(arrayCopy).every(k => k !== '' || k === null)
        if (toggle) this.setState({ disabled: false })
    }

    clearState = () => {
        this.setState({
            disabled: true,
            data: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            }
        })
    }

    render() {

        return (
            <div className='wrapper'>
                <div className='UserAdd'>
                    <div>
                        id
                        <input type='number' data-tag='id' value={this.state.data.id} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        firstName
                        <input type='text' value={this.state.data.firstName} data-tag='firstName' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        lastName
                        <input type='text' value={this.state.data.lastName} data-tag='lastName' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        email
                        <input type='email' value={this.state.data.email} data-tag='email' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        phone
                        <input data-tag='phone' type='phone' value={this.state.data.phone} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <button
                        className='btn btn-primary'
                        disabled={this.state.disabled}
                        onClick={() => {this.props.toggle(this.state.data);  this.clearState()}}
                    >
                        Add new user
                     </button>
                </div>

            </div>
        )
    }
}

export default UserAdd