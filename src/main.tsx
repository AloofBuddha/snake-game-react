import React from 'react'
import ReactDOM from 'react-dom/client'
import SnakeGame from './SnakeGame.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnakeGame />
  </React.StrictMode>,
)
