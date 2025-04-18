import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {LOGOUT_SUCCESS, getDatalogicBoxLabel, getItem, getLeaverequest, getSample, getUserprofile} from "../redux/action";
import React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { Helmet } from 'react-helmet';
import $ from 'jquery'

function Header() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
 
  function logoutclick() {
    dispatch({
      type: LOGOUT_SUCCESS
    });
    navigate("/");
  }
  function sampletrackingclick(){
    dispatch(getSample());
  }
  function homeclick() {
    dispatch(getItem());
  }
  function leaverequestclick() {
    dispatch(getLeaverequest())
  }
  function userprofileclick() {
    dispatch(getUserprofile(state.posts, state.user));
  }
  function qualityclick() {
    dispatch(getDatalogicBoxLabel());
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
 
  return (
    <div className="header">
      <div id="scrolltop">
          <img src="../img/totop1.png" alt="" onClick={() => {
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }}></img>
      </div>   
      <Helmet>
        <script src="../js/totop.js"></script>
      </Helmet> 
      <img src="../img/logo.png" style={{width:"40px",height:"40px", marginRight:"10px"}}></img>
      <h2 className="logotext">ScanApp</h2> 
      <div className="header-link-wrap">
        <Link to="/home" className="header-link" onClick={() => homeclick()}>
          Home
        </Link>
        <Link to="/leaverequest" className="header-link" onClick={() => leaverequestclick()} style={{}}>
          LeaveApplication
        </Link>
        <Link to="/quality" className="header-link" onClick={() => qualityclick()} style={{}}>
          Quality
        </Link>
        {state.user.role != "admin" && (
          <Link to="/products" className="header-link">
            Products
          </Link>
        )}
         <Link to="/sampletracking" className="header-link" onClick={() => sampletrackingclick()}>
          Sample
        </Link>
        {state.user.role == "admin" && (
          <Link to="/adminworkspace" className="header-link">
            Admin
          </Link>
        )}
        <Link to="/slideshow" className="header-link">
          Slideshow
        </Link>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={state.user.name} src={state.user.avatar} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu} style={{ marginTop: 0 }}>
              <Link
                to="/userprofile"
                className="usermenu"
                onClick={() => userprofileclick()}
              >
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu} style={{}}>
              <Link className="usermenu" to="/settings">
                Settings
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu} style={{ marginBottom: 0 }}>
              <Link to="/" className="usermenu" onClick={() => logoutclick()}>
                Logout
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
}
export default Header;
