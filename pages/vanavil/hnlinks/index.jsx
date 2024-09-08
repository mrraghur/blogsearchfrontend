import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import HNImageViewer from "./HNImageViewer";
import HNVideoViewer from "./HNVideoViewer";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const HNLinksViewer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Navigation tabs"
        >
          <Tab label="Images" />
          <Tab label="Videos" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HNImageViewer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <HNVideoViewer />
      </CustomTabPanel>
    </Box>
  );
};

export default HNLinksViewer;
