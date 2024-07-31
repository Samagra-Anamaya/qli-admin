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
  const [qliData, setQliData] = useState([]);
  const [trackData, setTrackData] = useState([]);
  const BASE_URL = import.meta.env.VITE_BACKEND_SERVICE_URL;

  let dummy = [
    {
      dashboardName: "Track Dashboard | Scholarships",
      linkToDashboard:
        "https://qlistsc.odisha.gov.in/metabase/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjEyfSwicGFyYW1zIjp7fSwiZXhwIjoxNzIyNDM4MDMxLCJpYXQiOjE3MjI0Mzc0MzB9.46TWO37PcRpwi2dnth_nQkXjWZ9WCXZcCATpMughPic#bordered=true&titled=true",
    },
    {
      dashboardName: "Track Dashboard | Anganwadi Centre",
      linkToDashboard:
        "https://qlistsc.odisha.gov.in/metabase/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjExfSwicGFyYW1zIjp7fSwiZXhwIjoxNzIyNDM4MDMxLCJpYXQiOjE3MjI0Mzc0MzB9.lBYwwg1_M0_iH3Bp2RSIuAnVgg_WmQCck5CJGT9bbEA#bordered=true&titled=true",
    },
  ];

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
        setQliData(() => {
          let qli = responseData?.filter((item) =>
            item.dashboardName.toLowerCase().includes("qli")
          );
          return qli;
        });
        setTrackData(() => {
          let track = responseData?.filter((item) =>
            item.dashboardName.toLowerCase().includes("track")
          );
          return track;
        });
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
          {trackData.length != 0 && (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              rowGap={3}
            >
              <Box px={11} py={1} sx={{ bgcolor: "#C5C4C5" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "500", color: "#ffffff" }}
                >
                  TRACK Dashboards
                </Typography>
              </Box>
              <nav>
                <List marker="circle">
                  <Box display={"flex"} flexDirection={"column"} rowGap={2}>
                    {trackData?.map((item, i) => {
                      return (
                        <ListItem
                          key={i}
                          disablePadding
                          onClick={() => {
                            window.location.href = item.linkToDashboard;
                          }}
                        >
                          <ListItemIcon>
                            <FormatListBulletedIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemButton sx={{ bgcolor: "#f6f6f6" }}>
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
          {qliData.length != 0 && (
            <Box
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              rowGap={3}
            >
              <Box px={11} py={1} sx={{ bgcolor: "#C5C4C5" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "500", color: "#ffffff" }}
                >
                  Indicator Dashboards
                </Typography>
              </Box>
              <nav>
                <List marker="circle">
                  <Box display={"flex"} flexDirection={"column"} rowGap={2}>
                    {qliData?.map((item, i) => {
                      return (
                        <ListItem
                          key={i}
                          disablePadding
                          onClick={() => {
                            window.location.href = item.linkToDashboard;
                          }}
                        >
                          <ListItemIcon>
                            <FormatListBulletedIcon fontSize="medium" />
                          </ListItemIcon>
                          <ListItemButton sx={{ bgcolor: "#f6f6f6" }}>
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
