import React from "react"
import { TableCell, TableRow, Typography } from "@material-ui/core"
import { BiUser } from "react-icons/bi"

const UserRow = (props) => {
  const { users } = props

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <BiUser style={{ fontSize: "2rem" }} />
        </TableCell>
        <TableCell component="th" scope="row" align="center" width="20%">
          <Typography component="div">{users.username}</Typography>
        </TableCell>
        <TableCell margin="auto" align="center" width="20%">
          <Typography component="div">{users.role}</Typography>
        </TableCell>
        <TableCell
          colSpan={3}
          style={{ wordBreak: "break-all" }}
          margin="auto"
          align="center"
          width="50%"
        >
          <Typography component="div">{users.publicKey} </Typography>
        </TableCell>
      </TableRow>
    </>
  )
}

export default UserRow
