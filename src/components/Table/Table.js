import React from 'react'

const Table = props => {
    function arrSort(sortVal) {
        if (sortVal === 'desc') {
            return (<i class="fas fa-sort-down" />)
        } else {
            return (<i class="fas fa-sort-up" />)
        }
    }
    return (
        <table className='table'>
            <thead>
                <tr style={{userSelect: "none"}}>
                    <th onClick={() => props.sorted('id')}>id {props.sortItem === 'id' ? arrSort(props.sortVal) : null}</th>
                    <th onClick={() => props.sorted('firstName')}>firstName{props.sortItem === 'firstName' ? arrSort(props.sortVal) : null}</th>
                    <th onClick={() => props.sorted('lastName')}>lastName{props.sortItem === 'lastName' ? arrSort(props.sortVal) : null}</th>
                    <th onClick={() => props.sorted('email')}>email{props.sortItem === 'email' ? arrSort(props.sortVal) : null}</th>
                    <th onClick={() => props.sorted('phone')}>phone{props.sortItem === 'phone' ? arrSort(props.sortVal) : null}</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data !== undefined
                        ? props.data.map(el => {
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
                        })
                        : <tr><td><h5 style={{ color: 'red' }}>Нет похожих элементов</h5></td></tr>
                }
            </tbody>
        </table>
    )
}

export default Table