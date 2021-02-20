import React, { Component } from 'react'

class Search extends Component {

    state = {
        value: ''
    }

    onChangeHandler = (event) => {
        this.setState({
            value: event.target.value
        })
        this.props.search(this.state.value)
    }

    render() {
        return (
            <div>
                <input value={this.state.value} onChange={event => this.onChangeHandler(event)} />
            </div>
        )
    }
}

export default Search
