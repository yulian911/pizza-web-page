import React, { FC } from 'react'

const NotFound:FC = () => {
  return (
    <div style={{
        padding: '100px',
        maxWidth: '750px',
        margin: '0 auto',
        textAlign: 'center'
        }}>
      <h1>
        <span style={{fontSize: '64px'}}>😕</span>
        <br />
        Nic nie odnaleziono
      </h1>
      <p style={{fontSize: '22px'}}>
        
Przepraszamy, ta strona nie jest dostępna w naszej witrynie.
      </p>
    </div>
  )
}

export default NotFound