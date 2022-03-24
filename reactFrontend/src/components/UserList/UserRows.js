import React, { useState } from "react"
import { makeStyles, TableCell, TableRow } from "@material-ui/core"
import { BiUser } from "react-icons/bi"

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
})

const UserRow = (props) => {
  const { users } = props
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <BiUser />
        </TableCell>
        <TableCell component="th" scope="row">
          {users.username}
        </TableCell>
        <TableCell margin="auto">{users.role}</TableCell>
        <TableCell colSpan={2} style={{ wordBreak: "break-all" }} margin="auto">
          {users.publicKey}{" "}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        ></TableCell>
      </TableRow>
    </>
  )
}

export default UserRow
