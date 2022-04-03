import React from "react"
import { useParams, Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Grid, TableRow, TableCell } from "@material-ui/core"
import Swal from "sweetalert2"
import { useFetch } from "../../utils/useFetch"
import RecordsRow from "../../components/CreateBlocks/RecordsRow"
import { IoMdArrowRoundBack } from "react-icons/io"
import Loading from "../../components/Loading/Loading"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60vw",
    margin: "auto",
    marginTop: "3rem",
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

  if (isLoading) {
    return <Loading />
  }

  if (serverError) {
    Swal.fire({
      customClass: { container: "z-index: 2000" },
      title: serverError.response.data.msg,
      icon: "error",
    })
  }

  return (
    <Grid container>
      <Grid item xl={12} lg={11} md={10} sm={10} xs={10}>
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
                    position: "absolute",
                    color: "#000",
                    fontSize: "2rem",
                    marginLeft: "51vw",
                  }}
                />
              </Link>
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {id}
            </Typography>

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
                {blockData.block.records?.map((record) => (
                  <RecordsRow key={record._id} records={record} />
                ))}
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default BlockDetails
