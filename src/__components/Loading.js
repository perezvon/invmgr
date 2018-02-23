import React from 'react'

const styles={backgroundColor: 'rgba(201, 48, 44, 0.6)', position: 'fixed', top: '0px', textAlign: 'center', left: '0px', color: '#fff', width: '100%', height: '100%', margin: '0 auto', paddingTop: '100px', transition: 'all 0.5s', animation: 'bounceIn 5s'}

export const Loading = () => (
  <div style={styles}>
    <h1>Loading...</h1>
  </div>
)
