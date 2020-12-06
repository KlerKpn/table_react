import React, { Component } from 'react'
import axios from 'axios'
import Table from './components/Table/Table'
import Loader from './components/Loader/Loader'
import RowData from './components/RowData/RowData'
import ReactPaginate from 'react-paginate'
import Search from './components/Search/Search'
import UserAdd from './components/UserAdd/UserAdd';
import { smallData, bigData } from './assets/url'

class App extends Component {
  state = {
    data: [],
    isLoading: true,
    rowData: null,
    sort: 'asc',
    sortItem: 'id',
    currentPage: 0,
    seachValue: '',
    showModal: false,
    toggleCheck: {
      small: true,
      big: false,
    }

  }

  componentDidMount() {
    this.getData(smallData)
  }

  getData = async url => {
    this.setState({ isLoading: true })
    const data = await axios.get(url)

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
    if (!data) throw new Error('Не получилось загрузить данные')
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
    this.setState({
      sort,
      data,
      sortItem: field
    })
  }

  handleSearch = (value) => {
    this.setState({
      seachValue: value,
      currentPage: 0
    })
  }

  getSearchData = () => {
    const { data, seachValue } = this.state
    if (!seachValue) return data
    const filtered = []

    data.forEach(el => {
      for (let i in el) {
        if (el[i].toString().toLowerCase().includes(seachValue.toLowerCase())) {
          filtered.push(el)
        }
      }
    })

    return filtered
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

  modalHandler = newUser => {
    let data = [...this.state.data]
    data.unshift(newUser)
    this.setState({
      data,
      showModal: false
    })
  }

  toggle = () => {
    const arrCopy = { ...this.state.toggleCheck }
    arrCopy.small = !this.state.toggleCheck.small
    arrCopy.big = !this.state.toggleCheck.big
    this.setState({ toggleCheck: arrCopy })
  }

  render() {
    const pageLimit = 20
    const searchData = this.getSearchData()
    const viewData = this.chunk(searchData, pageLimit)[this.state.currentPage]

    return (
      <div style={{ padding: '0 50px' }}>
        {
          this.state.isLoading
            ? <Loader />
            : <>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Search search={this.handleSearch} />
                <button className='btn btn-success' onClick={() => this.setState({ showModal: true })}>
                  Add User
                  </button>
                <div>
                  <button disabled={this.state.toggleCheck.small} onClick={() => { this.getData(smallData); this.toggle() }}>Small data</button>
                  <button disabled={this.state.toggleCheck.big} onClick={() => { this.getData(bigData); this.toggle() }}>Big data</button>
                </div>

              </div>

              {
                this.state.showModal
                  ? <UserAdd toggle={this.modalHandler} close={() => this.setState({ showModal: false })} />
                  : null
              }

              <Table
                data={viewData}
                row={this.setRowData}
                sorted={this.handleSort}
                sortItem={this.state.sortItem}
                sortVal={this.state.sort}
              />

              {
                searchData.length > pageLimit
                  ? <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={Math.ceil(searchData.length / pageLimit)}
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
                    breakLinkClassName='page-link'
                  />
                  : null
              }

              {
                this.state.rowData
                  ? <RowData data={this.state.rowData} />
                  : null
              }
            </>
        }
      </div>
    )
  }
}

export default App