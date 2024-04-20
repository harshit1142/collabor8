import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>

    <div  className='home-head d-flex justify-content-center align-items-center'>
        <div className='text-center'>
            <p style={{fontSize:"61px"}}>Collabor8</p>
            <p>Building Together, Coding Better: Your Collaborative Dev Companion </p>
            

          <Link to="/auth/login" className='text-light button-3'>Get Started</Link>
          
        </div>
    </div>
    </>
  )
}
