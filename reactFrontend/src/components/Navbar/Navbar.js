import React from "react"
import { useHistory } from "react-router-dom"
import clsx from "clsx"
import {
  makeStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import { MdDashboard, MdAccountCircle } from "react-icons/md"
import { GiHamburgerMenu } from "react-icons/gi"
import { useRole } from "../../utils/UserContext"
import { BiCalculator } from "react-icons/bi"
import { SiHiveBlockchain } from "react-icons/si"
import { AiOutlineTransaction } from "react-icons/ai"
import { FaUserFriends } from "react-icons/fa"

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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    background: theme.palette.primary.dark,
  },
}))

const Navbar = ({ open, setOpen }) => {
  const history = useHistory()
  const classes = useStyles()
  const { role } = useRole()

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("role")
    history.push("/")
  }

  const itemList = [
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Dashboard
        </Typography>
      ),
      icon: (
        <MdDashboard
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: [
        "Planter",
        "Miller",
        "Refiner",
        "WarehouseManager",
        "Retailer",
        "Validator",
      ],
      onClick: () => history.push("/dashboard"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Blockchain
        </Typography>
      ),
      icon: (
        <SiHiveBlockchain
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: [
        "Planter",
        "Miller",
        "Refiner",
        "WarehouseManager",
        "Retailer",
        "Validator",
      ],
      onClick: () => history.push("/blockchain"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Pending block
        </Typography>
      ),
      icon: (
        <MdDashboard
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: ["Validator"],
      onClick: () => history.push("/pendingBlock"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Create transaction
        </Typography>
      ),
      icon: (
        <AiOutlineTransaction
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: [
        "Planter",
        "Miller",
        "Refiner",
        "WarehouseManager",
        "Retailer",
      ],
      onClick: () => history.push("/createTransaction"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Pending transaction
        </Typography>
      ),
      icon: (
        <MdDashboard
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: ["Validator"],
      onClick: () => history.push("/pendingTransactions"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Create supply-chain record
        </Typography>
      ),
      icon: (
        <MdDashboard
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: [
        "Planter",
        "Miller",
        "Refiner",
        "WarehouseManager",
        "Retailer",
      ],
      onClick: () => history.push("/createSupplyChainRecord"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Pending supply-chain record
        </Typography>
      ),
      icon: (
        <MdDashboard
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: ["Validator"],
      onClick: () => history.push("/pendingRecords"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Products
        </Typography>
      ),
      icon: (
        <MdDashboard
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: [
        "Planter",
        "Miller",
        "Refiner",
        "WarehouseManager",
        "Retailer",
        "Validator",
      ],
      onClick: () => history.push("/products"),
    },
    {
      text: (
        <Typography
          style={{
            fontSize: "16px",
            color: "#fff",
          }}
        >
          User list
        </Typography>
      ),
      icon: (
        <FaUserFriends
          style={{ color: "white", fontSize: "1.8rem", paddingLeft: "6px" }}
        />
      ),
      allowedRole: [
        "Planter",
        "Miller",
        "Refiner",
        "WarehouseManager",
        "Retailer",
        "Validator",
      ],
      onClick: () => history.push("/users"),
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
            Palm Oil Blockchain
          </Typography>
          <div>
            <IconButton
              color="inherit"
              onClick={() => {
                history.push("/page/profile")
              }}
            >
              <MdAccountCircle style={{ fontSize: "2.3rem" }} />
            </IconButton>
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
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}> </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List>
            {itemList.map((item, index) => {
              const { text, icon, allowedRole, onClick } = item
              return (
                <React.Fragment key={index}>
                  {allowedRole.includes(role) && (
                    <ListItem button key={index} onClick={onClick}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )}
                </React.Fragment>
              )
            })}
          </List>
          <List>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                {
                  <MdDashboard
                    style={{
                      color: "white",
                      fontSize: "1.8rem",
                      paddingLeft: "6px",
                    }}
                  />
                }
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                style={{ fontSize: "16px", color: "#fff" }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  )
}

export default Navbar
