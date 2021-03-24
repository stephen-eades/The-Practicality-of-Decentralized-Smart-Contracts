import React from "react";
import { useHistory } from "react-router-dom";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./../../crepe.svg";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';


const { AccountData } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeMenuClick = () => {
    history.push("/");
    handleClose();
  };

  const handleAboutMenuClick = () => {
    history.push("/about");
    handleClose();
  };

  const handleCreateMenuClick = () => {
    history.push("/create");
    handleClose();
  };

  const handleBrowseMenuClick = () => {
    history.push("/browse");
    handleClose();
  };

  const handleSearchMenuClick = () => {
    history.push("/search");
    handleClose();
  };

  return (
    <div className="App">
      <div className="app-header">
        <h4 className="account-label-class">Account:</h4>
        <span className="account-address-class">
          <AccountData
            drizzle={drizzle}
            drizzleState={drizzleState}
            accountIndex={0}
            units="ether"
            precision={3}
          />
        </span>
      </div>

      <span className="navbar-icon-class">
        <Button className="navbar-icon-color-class" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MenuIcon style={{ fontSize: 33 }}/>
        </Button>
        <Menu 
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleHomeMenuClick}>Home</MenuItem>
          <MenuItem onClick={handleAboutMenuClick}>About</MenuItem>
          <MenuItem onClick={handleCreateMenuClick}>Create</MenuItem>
          <MenuItem onClick={handleBrowseMenuClick}>Browse</MenuItem>
          <MenuItem onClick={handleSearchMenuClick}>Search</MenuItem>
        </Menu>
      </span>
    </div>
  );
};
