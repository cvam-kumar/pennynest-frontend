import { createContext, useState } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  const [user, setUser] = useState(null)

  const clearUser = () => setUser(null)

  const contextValue = {
    openSideMenu,
    user,
    setOpenSideMenu,
    setUser,
    clearUser,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContext
