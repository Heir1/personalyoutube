import React from 'react'

const Filter = ({setvideoFilter}) => {

  const videofilterHandler = (e) => {
    e.preventDefault();
    setvideoFilter(e.target.value)
  }

  return (
    <div>
        <input type="text" id='filter'  className='example1 deskTop' placeholder="Filter.." onChange={(e) => videofilterHandler(e)}  />

        <input type="text" id='filter' className='example1 mobile' style={{marginTop:"50px"}} placeholder="Filter.." onChange={(e) => videofilterHandler(e)}  />
        
    </div>
  )
}

export default Filter