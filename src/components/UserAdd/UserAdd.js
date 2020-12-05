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
                        <div className='name'>
                            id
                        </div>

                        <input type='number' data-tag='id' value={this.state.data.id} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            firstName
                        </div>
                        <input type='text' value={this.state.data.firstName} data-tag='firstName' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            lastName
                        </div>
                        <input type='text' value={this.state.data.lastName} data-tag='lastName' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            email
                        </div>
                        <input type='email' value={this.state.data.email} data-tag='email' onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div>
                        <div className='name'>
                            phone
                        </div>
                        <input data-tag='phone' type='phone' value={this.state.data.phone} onChange={event => this.handleChange(event.target.getAttribute('data-tag'), event.target.value)} />
                    </div>
                    <div style={{ paddingTop: '20px' }}>
                        <button
                            className='btn btn-danger'
                            onClick={() => { this.props.close(); this.clearState() }}
                        >
                            Отмена
                          </button>
                        <button
                            style={{ marginLeft: '20px' }}
                            className='btn btn-primary'
                            disabled={this.state.disabled}
                            onClick={() => { this.props.toggle(this.state.data); this.clearState() }}
                        >
                            Добавить в таблицу
                     </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserAdd