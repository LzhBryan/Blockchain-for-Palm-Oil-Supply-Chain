import React from "react"
import { makeStyles, TableCell, TableRow, Typography } from "@material-ui/core"
import { BiUser } from "react-icons/bi"

const UserRow = (props) => {
  const { users } = props

  return (
    <>
      <TableRow>
        <TableCell>
          <BiUser style={{ fontSize: "2rem" }} />
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography component="div">{users.username}</Typography>
        </TableCell>
        <TableCell margin="auto">
          <Typography component="div">{users.role}</Typography>
        </TableCell>
        <TableCell colSpan={3} style={{ wordBreak: "break-all" }} margin="auto">
          <Typography component="div">{users.publicKey} </Typography>
        </TableCell>
      </TableRow>
    </>
  )
}

export default UserRow
