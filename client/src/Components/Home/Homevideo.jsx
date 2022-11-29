import React from 'react'
import Spinner from '../Spinner/Spinner'
import { NavLink } from 'react-router-dom'

const Homevideo = ({videos, videoFilter, loading}) => {
  return (
    <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop: "50px"}}>
        {
            loading ? (
                <Spinner/>
            )
            :
            (
                <div className="row">
                    {
                        videos.filter(videoTitle => {
                        if((videoTitle.snippet.title.toLowerCase()).includes(videoFilter.toLowerCase())){
                        return videoTitle
                        }
                        }).map((video, index) => (
                            <div className="col-md-3 col-sm-4" key={index}>
                                <NavLink to={video.id.videoId} style={{textDecoration : "none", color : "black"}}>
                                    <div className="thumbnail">
                                        <img src={video.snippet.thumbnails.high.url} alt="Lights" style={{width:"100%"}} className="videoImage"/>
                                        <div className="caption">
                                            <p>{video.snippet.title.length > 35 ? `${video.snippet.title.substring(0,35)}...` : video.snippet.title}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>   
                        ))
                    }
                </div>
            )
        }
        

    </div>
  )
} 

export default Homevideo