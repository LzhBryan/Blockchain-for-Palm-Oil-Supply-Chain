import React, { createContext, useContext, useState } from "react"

const UserContext = createContext()

export const useRole = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"))

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  )
}
