import React from 'react'

const RowData = ({ data }) => {
    return (
        <div>
            <p>{data.firstName} {data.lastName}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <textarea defaultValue={data.description} />
            <p>{data.address.streetAddress}</p>
            <p>{data.address.city}</p>
            <p>{data.address.state}</p>
            <p>{data.address.zip}</p>
        </div>
    )
}

export default RowData