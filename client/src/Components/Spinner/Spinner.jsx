import React from 'react'

const Spinner = () => {
  return (
        <div class="row">
            <div class="col-4 offset-5">
                <br/>
                <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
  )
}

export default Spinner