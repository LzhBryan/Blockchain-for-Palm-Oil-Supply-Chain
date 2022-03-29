import React from "react"
import { TableCell, TableRow } from "@material-ui/core"
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
          {users.username}
        </TableCell>
        <TableCell margin="auto">{users.role}</TableCell>
        <TableCell colSpan={3} style={{ wordBreak: "break-all" }} margin="auto">
          {users.publicKey}
        </TableCell>
      </TableRow>
    </>
  )
}

export default UserRow
