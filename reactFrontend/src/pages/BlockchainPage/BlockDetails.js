import React from "react"
import { useParams, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"
import { useFetch } from "../../utils/useFetch"
import RecordsRow from "../../components/CreateBlocks/RecordsRow"
import { IoMdArrowRoundBack } from "react-icons/io"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60vw",
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
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}))

const BlockDetails = () => {
  const classes = useStyles()
  const { id } = useParams()
  const {
    data: blockData,
    isLoading,
    serverError,
  } = useFetch("/api/blocks/" + id)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textPrimary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          BLOCK
          <Link to={`/blockchain`}>
            <IoMdArrowRoundBack
              style={{
                color: "#000",
                fontSize: "2rem",
                padding: "5px",
                marginLeft: "52vw",
              }}
            />
          </Link>
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {id}
        </Typography>
        {isLoading && (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        )}
        {serverError && (
          <Typography className={classes.pos} color="textSecondary">
            Error in fetching data...
          </Typography>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "20px" }}
            >
              Previous Hash:
            </Typography>
            <Typography component="div" style={{ paddingBottom: "15px" }}>
              {blockData.block.prevHash}
            </Typography>
          </>
          // <Typography
          //   className={classes.pos}
          //   color="textPrimary"
          //   style={{ wordBreak: "break-all" }}
          //   gutterBottom
          // >
          //   <br></br>
          //   Previous Hash:
          //   <br></br>
          //   {blockData.block.prevHash}
          // </Typography>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "10px" }}
            >
              Current Hash:
            </Typography>
            <Typography component="div" style={{ paddingBottom: "15px" }}>
              {blockData.block.hash}
            </Typography>
          </>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "10px" }}
            >
              Timestamp:
            </Typography>
            <Typography component="div" style={{ paddingBottom: "15px" }}>
              {blockData.block.timestamp}
            </Typography>
          </>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "10px" }}
            >
              Status:
            </Typography>
            <Typography component="div" style={{ paddingBottom: "15px" }}>
              {blockData.block.status}
            </Typography>
          </>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "10px" }}
            >
              Approved By:
            </Typography>
            <Typography component="div" style={{ paddingBottom: "15px" }}>
              {blockData.block.approvedBy + ""}
            </Typography>
          </>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "10px" }}
            >
              Rejected By:
            </Typography>
            <Typography component="div" style={{ paddingBottom: "15px" }}>
              {blockData.block.rejectedBy + ""}
            </Typography>
          </>
        )}
        {blockData && (
          <>
            <Typography
              className={classes.pos}
              color="textSecondary"
              style={{ paddingTop: "10px" }}
            >
              Records:
            </Typography>

            {blockData.block.records?.map((record) => (
              <RecordsRow key={record._id} records={record} />
            ))}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default BlockDetails
