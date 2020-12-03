import React from 'react'

const Table = props => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th onClick={() => props.sorted('id')}>id<div>{props.sortItem === 'id' ? props.sortVal : null}</div></th>
                    <th onClick={() => props.sorted('firstName')}>firstName</th>
                    <th onClick={() => props.sorted('lastName')}>lastName</th>
                    <th onClick={() => props.sorted('email')}>email</th>
                    <th onClick={() => props.sorted('phone')}>phone</th>
                </tr>
            </thead>
            <tbody>
                {props.data.map(el => {
                    const index = el.id + Math.random()
                    return (
                        <tr key={index} onClick={() => props.row(el)}>
                            <td>{el.id}</td>
                            <td>{el.firstName}</td>
                            <td>{el.lastName}</td>
                            <td>{el.email}</td>
                            <td>{el.phone}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table