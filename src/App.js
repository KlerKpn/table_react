import React, { Component } from 'react'
import axios from 'axios'
import Table from './components/Table/Table'
import Loader from './components/Loader/Loader'
import RowData from './RowData/RowData'
import ReactPaginate from 'react-paginate'

class App extends Component {
  state = {
    data: [],
    isLoading: true,
    rowData: null,
    sort: 'asc',
    sortItem: 'id'
  }

  async componentDidMount() {
    const data = await axios.get('http://www.filltext.com/?rows=322&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')

    this.setState({
      data: data.data,
      isLoading: false,
    })
    this.handleSort('id')
  }

  setRowData = rowData => {
    this.setState({ rowData })
  }

  compareBy = (key, sort) => {
    return (a, b) => {
      if (sort === 'asc') {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      }
    }
  }

  handleSort = async field => {
    const cloneData = [...this.state.data]
    const data = await cloneData.sort(this.compareBy(field, this.state.sort))
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    this.setState({
      sort,
      data,
      sortItem: field
    })
  }


  handlePageClick = page =>{
    console.log(page)
  }
  render() {
    return (
      <>
        {
          this.state.isLoading
            ? <Loader />
            : <Table
              data={this.state.data}
              row={this.setRowData}
              sorted={this.handleSort}
              sortItem={this.state.sortItem}
              sortVal={this.state.sort}
            />
        }

        {
          this.state.data.length > 50
            ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(this.state.data.length / 50)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              nextClassName='page-item'
              previousLinkClassName='page-link'
              nextLinkClassName='page-link'
            />
            : null
        }

        {
          this.state.rowData
            ? <RowData data={this.state.rowData} />
            : null
        }


      </>
    )
  }
}

export default App