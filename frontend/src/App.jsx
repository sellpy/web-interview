import React from 'react'

import './App.css'
import { ToDoLists } from './components/ToDoLists'
import { ToDoContextProvider } from './util/context'
import { MainWrapper } from './components/MainWrapper'

const App = () => (
  <ToDoContextProvider>
    <MainWrapper>
      <ToDoLists />
    </MainWrapper>
  </ToDoContextProvider>
)

export default App
