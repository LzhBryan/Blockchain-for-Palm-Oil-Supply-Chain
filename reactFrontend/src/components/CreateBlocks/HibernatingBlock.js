import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import RecordsRow from "./RecordsRow"

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },
  title: {
    fontSize: 18,
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
            className={classes.title}
            color="textPrimary"
            gutterBottom
          >
            HIBERNATING BLOCK
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Block ID:
          </Typography>
          <Typography
            variant="body2"
            component="p"
            gutterBottom
            style={{ paddingBottom: "15px" }}
          >
            {block.blockId}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Previous Hash:
          </Typography>
          <Typography
            variant="body2"
            component="p"
            gutterBottom
            style={{ paddingBottom: "15px" }}
          >
            {block.prevHash}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Current Hash:
          </Typography>
          <Typography
            variant="body2"
            component="p"
            gutterBottom
            style={{ paddingBottom: "15px" }}
          >
            {block.hash}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Timestamp:
          </Typography>
          <Typography
            variant="body2"
            component="p"
            gutterBottom
            style={{ paddingBottom: "15px" }}
          >
            {block.timestamp}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Status:
          </Typography>
          <Typography
            variant="body2"
            component="p"
            gutterBottom
            style={{ paddingBottom: "15px" }}
          >
            {block.status}
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            Approved By:
          </Typography>
          <Typography
            variant="body2"
            component="p"
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
