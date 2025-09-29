import { Box, Paper, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import {Predicate, type PredicateType} from '../../../lib/contantes/constants'
import ProfileEvents from "./ProfileEvents";
export default function ProfileContent() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const tabContents = [
    { label: "About", content: <ProfileAbout/> },
    { label: "Photos", content: <ProfilePhotos/> },
    { label: "Events", content: <ProfileEvents/> },
    { label: "Followers", content:  <ProfileFollowings key={'FOLLOWERS'} predicate={Predicate.FOLLOWERS as PredicateType}/> },
    { label: "Following", content:  <ProfileFollowings key={'FOLLOWINGS'} predicate={Predicate.FOLLOWINGS as PredicateType}/> },
  ];

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component={Paper}
      mt={2}
      p={3}
      borderRadius={3}
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "flex-start",
        borderRadius: 3,
      }}
    >
      <Tabs
        orientation={isSmallScreen ? "horizontal" : "vertical"}
        variant={isSmallScreen ? "scrollable" : "standard"}
        scrollButtons={isSmallScreen ? "auto" : false}
        allowScrollButtonsMobile
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: isSmallScreen ? 0 : 1,
          borderBottom: isSmallScreen ? 1 : 0,
          borderColor: "divider",
          minWidth: isSmallScreen ? "auto" : 250,
          mb: isSmallScreen ? 2 : 0,
          // Target scrollable container inside Tabs
          "& .MuiTabs-scrollableX": {
            overflowX: "auto",
            flexWrap: "nowrap",
            WebkitOverflowScrolling: "touch", // smooth scrolling on mobile
          },
        }}
      >
        {tabContents.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              mr: isSmallScreen ? 1 : 3,
              minWidth: isSmallScreen ? 80 : "auto",
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ flexGrow: 1, p: 3 }}>{tabContents[value].content}</Box>
    </Box>
  );
}
