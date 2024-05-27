import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function Home(){
  const [data,setData] = useState([])
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVICE_URL;

    useEffect(()=>{
        const token = localStorage.getItem("token");
        fetch(`${BASE_URL}/dashboard`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error');
            }
            return response.json();
          })
          .then(data => {
            console.log('dashboard link',data.data);
            setData(()=> data.data)
          })
          .catch(error => {
            console.log("error",error.message);
          });
    },[])
    return (
    <>
    <Navbar />
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} mt={12} mb={5} rowGap={3} sx={{ width: '100%',height:"80vh" }}>
      <Box px={11} py={1} sx={{bgcolor:"#00745F"}}><Typography variant="h6" sx={{fontWeight:"500", color:"#ffffff"}}>
        List of Dashboards</Typography></Box>
      <nav>
        <List marker="circle">
          <Box display={"flex"} flexDirection={"column"} rowGap={2}>
          {data?.map((item,i)=>{
           return <ListItem key={i} disablePadding onClick={()=>{window.location.href=item.linkToDashboard}}>
             <ListItemIcon>
              <FormatListBulletedIcon fontSize="medium"/>
             </ListItemIcon>
             <ListItemButton sx={{bgcolor:"#f6f6f6"}}>
               <ListItemText primary={item.dashboardName} />
             </ListItemButton>
           </ListItem>
          })}</Box>
        </List>
      </nav>
    </Box> 
    </>
    )
}

export default Home
