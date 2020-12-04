import React, { Component } from 'react'
import axios from 'axios'
import Table from './components/Table/Table'
import Loader from './components/Loader/Loader'
import RowData from './RowData/RowData'
import ReactPaginate from 'react-paginate'
import Search from './components/Search/Search'

class App extends Component {
  state = {
    data: [],
    isLoading: true,
    rowData: null,
    sort: 'asc',
    sortItem: 'id',
    currentPage: 0,
    seachValue: ''
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

  handleSearch = (value) => {
    // let arrayCopy = [...this.state.data]
    // let items =[]
    // const arrayFilter = arrayCopy.filter(el => {
    //   for(let i in el){
    //     if(el[i].toString().toLowerCase().includes(value)){
    //       return items.push(el)
    //     } 
    //   }     
 
    //   return items
    // })
  }

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected
    })
  }

  chunk = (arr, chunkSize = 1, cache = []) => {
    const tmp = [...arr]
    if (chunkSize <= 0) return cache
    while (tmp.length) cache.push(tmp.splice(0, chunkSize))
    return cache
  }

  render() {
    const pageLimit = 50
    const viewData = this.chunk(this.state.data, pageLimit)[this.state.currentPage]

    return (
      <>
        {
          this.state.isLoading
            ? <Loader />
            : <>
              <Search search={this.handleSearch} />
              <Table
                data={viewData}
                row={this.setRowData}
                sorted={this.handleSort}
                sortItem={this.state.sortItem}
                sortVal={this.state.sort}
              />
            </>
        }

        {
          this.state.data.length > pageLimit
            ? <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(this.state.data.length / pageLimit)}
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
              forcePage={this.state.currentPage}
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