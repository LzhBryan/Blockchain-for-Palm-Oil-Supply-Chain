import React from "react"
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  TableCell,
  TableRow,
} from "@material-ui/core"
import RecordsRow from "./RecordsRow"

const useStyles = makeStyles({
  root: {
    width: "60vw",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "3rem",
  },
  pos: {
    marginBottom: 10,
  },
})

const HibernatingBlock = ({ block }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "15px",
            fontSize: "20px",
            fontWeight: "bolder",
            color: "#000",
          }}
        >
          HIBERNATING BLOCK
        </Typography>

        <Typography
          className={classes.pos}
          color="textSecondary"
          style={{ paddingTop: "15px" }}
        >
          Block ID:
        </Typography>
        <Typography
          component="div"
          gutterBottom
          style={{ paddingBottom: "15px" }}
        >
          {block.blockId}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Previous Hash:
        </Typography>
        <Typography
          component="div"
          gutterBottom
          style={{ paddingBottom: "15px" }}
        >
          {block.prevHash}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Current Hash:
        </Typography>
        <Typography
          component="div"
          gutterBottom
          style={{ paddingBottom: "15px" }}
        >
          {block.hash}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Timestamp:
        </Typography>
        <Typography
          component="div"
          gutterBottom
          style={{ paddingBottom: "15px" }}
        >
          {block.timestamp}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Status:
        </Typography>
        <Typography
          component="div"
          gutterBottom
          style={{ paddingBottom: "15px" }}
        >
          {block.status}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Approved By:
        </Typography>
        <Typography
          component="div"
          gutterBottom
          style={{ paddingBottom: "15px" }}
        >
          {block.approvedBy + ""}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          Records:
        </Typography>
        <TableRow>
          <TableCell margin="auto" align="center" width="5%" />
          <TableCell margin="auto" align="center" width="40%">
            Records ID
          </TableCell>
          <TableCell margin="auto" align="center" width="20%">
            Timestamp
          </TableCell>
          <TableCell margin="auto" align="center" width="20%">
            Status
          </TableCell>
        </TableRow>
        {block.records?.map((record) => (
          <RecordsRow key={record._id} records={record} />
        ))}
      </CardContent>
    </Card>
  )
}

export default HibernatingBlock
