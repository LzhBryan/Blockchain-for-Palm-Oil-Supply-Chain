import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import RecordsRow from "./RecordsRow"

const useStyles = makeStyles({
  root: {
    width: "60vw",
    margin: "auto",
    marginTop: "5rem",
  },
  pos: {
    marginBottom: 10,
  },
})

const HibernatingBlock = ({ block }) => {
  const classes = useStyles()
  return (
    <div>
      <Card className={classes.root}>
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
          {block.records?.map((record) => (
            <RecordsRow key={record._id} records={record} />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default HibernatingBlock
