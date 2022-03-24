import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import clsx from "clsx"
import {
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core"
import {
  MdDashboard,
  MdAccountCircle,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 36,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
    overflow: "hidden",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}))

const Navbar = ({ open, setOpen }) => {
  const history = useHistory()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const [openList, setOpenList] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    history.push("/")
  }

  const handleExpand = () => {
    setOpenList(!openList)
  }

  const itemList = [
    {
      text: "Dashboard",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
      onClick: () => history.push("/dashboard"),
    },
    {
      text: "Blockchain",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
      onClick: () => history.push("/blockchain"),
    },
    {
      text: "Pending block",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
      onClick: () => history.push("/pendingBlock"),
    },
    {
      text: "Create transaction",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
      onClick: () => history.push("/createTransaction"),
    },
    {
      text: "Pending transaction",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
      onClick: () => history.push("/pendingTransactions"),
    },
    {
      text: "Create supply-chain record",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
    },
    {
      text: "Pending supply-chain record",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
      onClick: () => history.push("/pendingRecords"),
    },
    {
      text: "Products",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
    },
    {
      text: "User list",
      icon: <MdDashboard style={{ fontSize: "2rem" }} />,
    },
  ]

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <GiHamburgerMenu />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Palm oil Blockchain
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MdAccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openMenu}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}></div>
        <Divider />
        <List>
          {itemList.map((item) => {
            const { text, icon, onClick } = item
            return (
              <>
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                  {/* {openList ? (
                    <MdExpandLess onClick={handleExpand} />
                  ) : (
                    <MdExpandMore onClick={handleExpand} />
                  )} */}
                </ListItem>
                {/* <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <MdDashboard />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItem>
                  </List>
                </Collapse> */}
              </>
            )
          })}
        </List>
      </Drawer>
    </>
  )
}

export default Navbar
