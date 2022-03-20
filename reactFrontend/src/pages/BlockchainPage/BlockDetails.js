import React from "react"
import { useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { useFetch } from "../../utils/useFetch"
import RecordsRow from "../../components/CreateBlocks/RecordsRow"

const useStyles = makeStyles({
  root: {
    width: "60%",
    margin: "auto",
    marginTop: "5rem",
  },
  title: {
    fontSize: 18,
  },
  pos: {
    fontSize: 15,
    marginBottom: 12,
  },
})

const BlockDetails = () => {
  const classes = useStyles()
  const { id } = useParams()
  const {
    data: blockData,
    isLoading,
    serverError,
  } = useFetch("http://localhost:5000/api/blocks/" + id)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          BLOCK
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {id}
        </Typography>
        {isLoading && (
          <Typography className={classes.pos} color="textSecondary">
            Loading...
          </Typography>
        )}
        {serverError && (
          <Typography className={classes.pos} color="textSecondary">
            Error in fetching data...
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
            gutterBottom
          >
            <br></br>
            Previous Hash:
            <br></br>
            {blockData.block.prevHash}
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
            gutterBottom
          >
            <br></br>
            Current Hash:
            <br></br>
            {blockData.block.hash}
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
            gutterBottom
          >
            <br></br>
            Timestamp:
            <br></br>
            {blockData.block.timestamp}
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
            gutterBottom
          >
            <br></br>
            Status:
            <br></br>
            {blockData.block.status}
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
            gutterBottom
          >
            <br></br>
            Approved By:
            <br></br>
            {blockData.block.approvedBy + ""}
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
            gutterBottom
          >
            <br></br>
            Rejected By:
            <br></br>
            {blockData.block.rejectedBy + ""}
          </Typography>
        )}
        {blockData && (
          <Typography
            className={classes.pos}
            color="textPrimary"
            style={{ wordBreak: "break-all" }}
          >
            <br></br>
            Records:
            {blockData.block.records?.map((record) => (
              <RecordsRow key={record._id} records={record} />
            ))}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default BlockDetails
