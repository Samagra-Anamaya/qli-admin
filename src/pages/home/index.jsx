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
    <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} sx={{ width: '100%' }} my={5} py={3}>
      <Box p={4}><Typography variant="h4">
        List of Dashboards</Typography></Box>
      <nav>
        <List marker="circle">
          {data?.map((item,i)=>{
           return <ListItem key={i} disablePadding onClick={()=>{window.location.href=item.linkToDashboard}}>
             <ListItemIcon>
              <FormatListBulletedIcon />
             </ListItemIcon>
             <ListItemButton>
               <ListItemText primary={item.dashboardName} />
             </ListItemButton>
           </ListItem>
          })}
        </List>
      </nav>
    </Box>
    </>
    )
}

export default Home
