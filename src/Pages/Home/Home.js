import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>

    <div  className='home-head d-flex justify-content-center align-items-center'>
        <div className='text-center'>
            <p style={{fontSize:"61px"}}>Collabor8</p>
            <p>asd sdfsdf sfsf dsgfds svds dsfsdffs  ds </p>
            

          <Link to="/auth/login" className='text-light button-3'>Get Started</Link>
          
        </div>
    </div>
    </>
  )
}
