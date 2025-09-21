import React from 'react'
import { ClipLoader } from 'react-spinners'

function Loader( { loading } ) {
    if (!loading) return null;
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        blur: 10,
        zIndex: 10,
    }
  return (
    <div style= {overlayStyle}>
        <ClipLoader size={50} color={"#A40C8B"} />
    </div>
  )
}

export default Loader