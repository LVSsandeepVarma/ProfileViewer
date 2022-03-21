import './view.css'
import React, {useEffect,useState} from "react";
import axios from 'axios'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import Grid from '@mui/material/Grid';
import { useLocation } from "react-router-dom";

import { grey } from '@mui/material/colors';
import { textAlign } from '@mui/system';
import {useNavigate} from 'react-router-dom'

function View(){
    const navigate=useNavigate()
    const [repos,setRepos]=useState([])
    const location=useLocation()
    useEffect(()=>{
        try{
            (async()=>{
                const res=await axios.get(`${location.state.repos_url}`)
                const repo=Object.values([...repos,res.data])
                console.log('repos',Object.values(repo[0]))
                setRepos(Object.values(repo[0]))
            })()
        }
        catch(err){
            console.log(err)
        }
    },[])
    console.log(location.state)
    return(
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 3,

                    justifyItems:'center',
                    width: '100%',
                    height: '100%',
                    },
                    backgroundColor: 'gray',
                    backgroundRepeat:"repeat",
                    opacity: [0.9, 0.8, 1],
                }}
                >
                    <Paper  sx={{backgroundColor:'lightgrey',color:"black"}}  elevation={20}>
                        <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} >
                        <div  style={{ display:"flex",float:"left",margin:'1%',marginLeft:'2vw'}}>
                            <button style={{backgroundColor:"transparent",border:"none",textAlign:"start"}} onClick={()=>{navigate(-1)}}><UndoRoundedIcon /></button>
                            <h4 ><b>Back</b></h4>
                        </div>
                        </Grid>
                        <div className="card" style={{width:'95%',textAlign:"left",marginLeft:"3%",border:"none",padding:'1%',display:"flex",alignItems:"center"}}>
                        {/* <div className="card" style={{width:"100%" ,display:"flex",alignItems:"center"}}> */}
                            <div className="col-md-1 col-sm-2 col-2" style={{textAlign:"left"}} >
                                <img  src={location.state.avatar_url} alt="not found"  width="75%" />
                            </div>
                            <div className="col-md-10 col-sm-9 col-10 "  style={{textAlign:"left",marginLeft:"1%"}}>
                                <h3><b>{location.state.login}</b></h3>
                                <h4>@handle</h4>
                            </div>
                        </div>
                        {/* </div > */}
                        {/* <Paper style={{marginLeft:'3%', width:"95%"}}> */}
                            {/* <Grid item sm={12} md={12}> */}
                               <div  className="card Card" sm={12} md={12} xs={12}  style={{textAlign:"left",marginLeft:"3%"}}>
                                    <div className="card-body">
                                        <h5 className="card-title">Bio</h5>
                                        <p className="card-text"><b>{location.state.bio}</b></p>
                                        <div className="row" style={{display:"flex"}}>
                                            <p className="col-md-9 col-sm-9 col-8" color={grey} >Repositories</p>
                                            <p className="col-md-3 col-sm-3 col-4" color={grey}>Followers</p>
                                        </div>
                                        <div className="row" style={{display:"flex"}}>
                                            <p className="col-md-9 col-sm-9 col-9"  ><b>{location.state.public_repos}</b></p>
                                            <p className="col-md-3 col-sm-3 col-3"><b>{location.state.followers}</b></p>
                                        </div>
                                        <div className="row">
                                            <p>Pinned Repositories</p>
                                            {Object.values(repos).map((each,ind)=>{
                                                return(
                                                    <Paper key={ind} elevation={15} className="card" style={{padding:"1%",margin:"1%",width:'97%'}}>
                                                        <div className="row" style={{display:"flex",width:"100%",alignItems:"center"}}>
                                                            <div className="col-md-1 col-sm-1 col-1">
                                                                <img className="image" src={location.state.avatar_url}  alt="img" />
                                                            </div>
                                                            <div className="col-md-11 col-sm-11 col-11">
                                                                <b>{each.full_name}</b>
                                                                <p>{each.description}</p>
                                                            </div>
                                                        </div>
                                                    </Paper>
                                                )
                                            })}
                                        </div>
                                    </div>
                               </div>
                            
                        {/* </Paper> */}
                        </Grid>
                    </Paper>
                    
                </Box>
        </div>
    )
}
export default View