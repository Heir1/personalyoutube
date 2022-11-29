import React, {useState, useEffect} from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import Filter from '../Filtervideo/Filter'


const Channel = ({channels}) => {

    const [loading, setLoading] = useState(false)
    const [videoFilter, setvideoFilter] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
        setLoading(true);
    }, [])

    if(!localStorage.getItem('access_token')){
        navigate('/')
      }
    else{
        return (

            <div className="col-md-10 col-sm-10 col-xs-10" style={{marginTop: "70px"}}>
                <div className='row' style={{marginBottom: "20px"}}>
                    <div className={`col-md-6 col-sm-6 col-xs-6 offset-3 deskTop`}>
                        <Filter setvideoFilter={setvideoFilter} />
                    </div>
                    <div className={`col-md-6 col-sm-6 col-xs-6 mobile`}>
                        <Filter setvideoFilter={setvideoFilter} />
                    </div>
                </div>
                <div className="row">
                    
                    {
                        channels.filter(channel => {
                            if((channel.snippet.title.toLowerCase()).includes((videoFilter.toLowerCase()).trim())){
                                return channel
                            }
                        }).map((channel, index) => (
                            <div className="col-md-5 col-sm-5 channelDesign" key={index}>
                                <NavLink to={channel.snippet.resourceId.channelId} style={{color:"white", textDecoration:"none"}}>
                                    <div className="row">
                                        <div className="col-md-4 col-sm-4">
                                            <div className="circle">
                                                <img src={channel.snippet.thumbnails.default.url} alt="Nature" style={{width:"100%"}} className="videoImage"/>
                                                <div className="caption">
                                                  <p>{channel.snippet.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8 col-sm-8">
                                            <div className="thumbnail">
                                                <div className="caption">
                                                    <p>{(channel.snippet.description).length > 200 ? `${(channel.snippet.description).substring(0,200)}...` : channel.snippet.description }.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))
                    }


                </div> 
            </div>
        )
    }

}

export default Channel