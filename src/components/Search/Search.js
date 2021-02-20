import React, { useEffect, useState } from 'react'

const Search = props => {
    const [value, setValue] = useState('')

    function onChangeHandler(event) {
        setValue(event.target.value)
    }

    useEffect(() => {
        props.search(value)
    }, [value])

    return (
        <div>
            <input value={value} onChange={event => onChangeHandler(event)} />
        </div>
    )
}

export default Search
