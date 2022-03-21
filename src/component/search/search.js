import './search.css'
import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import View from '../view/view'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Search(){
    const navigate=useNavigate()
    const [search,setSearch]=useState('')
    const [userData,setUserData]=useState([])
    useEffect(()=>{
        try{
            (()=>{
                const data=JSON.parse(window.localStorage.getItem('data'))
                if (!data){
                    console.log('h')
                }
                else{
                    setUserData(data)
                }

            })()
        }
        catch(err){
            console.log(err)
        }
    },[])
    onbeforeunload = function (e) { localStorage. clear(); };
    const performSearchREq= async ()=>{
        try{

            const res=await axios.get(`https://api.github.com/users/${search}`)
            console.log(res.data,res.data.name)
            const userinfo=[...userData,res.data]
            setUserData(userinfo)
            console.log('search',userData)
            window.localStorage.setItem("data",JSON.stringify(userinfo))
            window.sessionStorage.setItem("data",JSON.stringify(userinfo))


        }catch(err){
            alert(`User not found with name ${search}`)
            console.log(err)
        }
    } 

    const handleSearch=(e)=>{
        e.
        preventDefault()
        performSearchREq()
    }
    // const handleClick=()=>{
    //     navigate('/view')
    // }
    const HandleDispaly=(e)=>{
        console.log(userData[e.target.name])
        const info=userData[e.target.name]
        navigate('/view',{state:info })
        
    }
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
                    height: '97vh',
                    },
                    backgroundColor: 'gray',
                    backgroundRepeat:"repeat",
                    opacity: [0.9, 0.8, 1],
                }}
                >
                <Paper  sx={{backgroundColor:'lightgrey',color:"black",height:'92vh'}}  elevation={20}>
            <div >
            <h1 className="searchbarfeild"><i className="fa fa-github" style={{fontSize:"150%"}}></i> Github Profile viewer</h1>
            <form onSubmit={handleSearch}>
                <div className="searchbar" style={{color:"white"}}>
                    <input onChange={(e)=>{setSearch(e.target.value)}} id="inputcolor" placeholder="search user" className="search btn btn-primary" type="search"/>
                    {/* <button className="btn btn-primary" type="submit">X</button> */}
                </div>
            </form>
            <div className="Container col-md-10 col-sm-10 col-10"  >
                <div className="col-md-12 col-sm-12 col-12">
                    {userData.map((each,ind)=>{
                                return(
                                    <div key={ind} className="card  m-2 col-md-5 col-sm-5 col-5">
                                            <div   className="card-body col-md-5 col-sm-5 col-5" name={ind} > 
                                                <div className="col-md-10 col-sm-10 col-10"  style={{display:"flex",padding:"1vw",alignItems:"center"}}>
                                                    <img className="img col-0" src={each.avatar_url}  alt="..."/>
                                                    <h5 style={{textAlign:"left"}}  className="card-title col-md-10 col-sm-10 col-12">{each.login}</h5>
                                                    
                                                </div>
                                                <div style={{display:'flex'}}  className="col-md-12 col-sm-11 col-12" >
                                                    <p style={{width:"100%"}} className="card-text col-md-10 col-sm-12 col-10">{each.bio===null?"no bio available":each.bio}</p>
                                                </div>
                                                <button name={ind}  style={{fontSize:"xx-small", width:"auto"}} className="card-text col-md-10 col-sm-10 col-10 btn btn-primary" onClick={HandleDispaly} >view profile</button>

                                            </div>
                                    </div>
                    )})}
                </div>                
            </div>
        </div>
        </Paper>
        </Box>
    </div>
    )
}
export default Search