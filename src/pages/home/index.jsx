import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Container, Grid } from "@mui/material";

function Home() {
  const [data, setData] = useState([]);
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVICE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/dashboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        const responseData = data.data;
        setData(responseData);
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  }, []);
  return (
    <>
      <Navbar />
      <Grid p={12} pb={5}>
        <Box
          display={"flex"}
          justifyContent={"space-around"}
          width={"100%"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={3}
        >
          {data.length != 0 && (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              rowGap={3}
              width={"50%"}
              minWidth={"300px"}
            >
              {/* <Box px={11} py={1} sx={{ bgcolor: "#C5C4C5" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "500", color: "#ffffff" }}
                >
                  Indicator Dashboards
                </Typography>
              </Box> */}
              <nav style={{ width: "100%" }}>
                <List marker="circle">
                  <Box display={"flex"} flexDirection={"column"} rowGap={2} width={"100%"}>
                    {data?.map((item, i) => {
                      return (
                        <ListItem
                          sx={{width: "100%"}}
                          key={i}
                          disablePadding
                          onClick={() => {
                            window.location.href = item.linkToDashboard;
                          }}
                        >
                          {/* <ListItemIcon>
                            <FormatListBulletedIcon fontSize="medium" />
                          </ListItemIcon> */}
                          <ListItemButton sx={{ bgcolor: "#f5bc96", borderRadius: '10px', width: '100%', ":hover": { bgcolor: "#f5bc96" } }}>
                            <ListItemText primary={item.dashboardName} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </Box>
                </List>
              </nav>
            </Box>
          )}
        </Box>
      </Grid>
      {/* <Box display={"flex"} alignItems={"center"} flexDirection={"column"} mt={12} mb={5} rowGap={3} sx={{ width: '100%',height:"80vh" }}>
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
          })}
          </Box>
        </List>
      </nav>
    </Box>  */}
    </>
  );
}

export default Home;
