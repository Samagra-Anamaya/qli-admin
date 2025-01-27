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
import NavbarImage from "../../assets/track_navbar.png";

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
        setData(data);
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
              width={"80%"}
              minWidth={"300px"}
            >
              {data?.departmentData?.logo && (
                <div
                  style={{
                    position: "absolute",
                    top: "70px",
                    right: "50px",
                    textAlign: "center",
                    maxWidth: "200px",
                  }}
                >
                  <img
                    src={data?.departmentData?.logo}
                    alt=""
                    width={"100px"}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      fontFamily: "Calibri",
                    }}
                  >
                    {data?.departmentData?.name
                      ? data?.departmentData?.name
                      : "Government of Odisha"}
                  </p>
                </div>
              )}
              <img
                src={NavbarImage}
                alt="navbar-logo"
                width={"600px"}
                height={"300px"}
              />
              {data?.departmentData?.name && (
                <Box px={11} py={1} sx={{ width: "100%", textAlign: "center" }}>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: "600", color: "#545454" }}
                  >
                    {data.departmentData.name}
                  </Typography>
                </Box>
              )}
              <nav style={{ width: "100%" }}>
                <List marker="circle">
                  <Box
                    display={"flex"}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    gap={3}
                    width={"100%"}
                  >
                    {data?.data?.map((item, i) => {
                      return (
                        <ListItem
                          sx={{
                            width: "30%", // Max width to ensure only 3 items in a row
                            minWidth: "250px", // Ensures a minimum size
                            maxWidth: "300px", // Set a maximum width
                          }}
                          key={i}
                          disablePadding
                          onClick={() => {
                            window.location.href = item.linkToDashboard;
                          }}
                        >
                          {/* <ListItemIcon>
                            <FormatListBulletedIcon fontSize="medium" />
                          </ListItemIcon> */}
                          <ListItemButton
                            sx={{
                              background:
                                "linear-gradient(90deg, rgba(250,171,62,1) 35%, rgba(254,150,74,1) 100%)",
                              borderRadius: "10px",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <ListItemText
                              primary={
                                item.dashboardName.includes(":") ? (
                                  <>
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "24px",
                                      }}
                                    >
                                      {item.dashboardName.split(":")[0]}:
                                    </span>{" "}
                                    <span style={{ fontSize: "20px" }}>
                                      {item.dashboardName.split(":")[1]}
                                    </span>
                                  </>
                                ) : (
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "24px",
                                    }}
                                  >
                                    {item.dashboardName}
                                  </span>
                                )
                              }
                              sx={{
                                height: "100%",
                                color: "white",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
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
