import React from 'react'

const FrontFilter = () => {
  return (
    <div className="py-5">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
          <div id="slider-range" className="border-primary"></div>
          <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled="" />
        </div>
        <div className="col-lg-6 text-lg-right">
          <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter</h3>
          <button type="button" className="btn btn-primary btn-md dropdown-toggle px-4" id="dropdownMenuReference"
            data-toggle="dropdown">Reference</button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
            <a className="dropdown-item" href="#">Relevance</a>
            <a className="dropdown-item" href="#">Name, A to Z</a>
            <a className="dropdown-item" href="#">Name, Z to A</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Price, low to high</a>
            <a className="dropdown-item" href="#">Price, high to low</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FrontFilter