import { SignUp } from '@clerk/nextjs'
import React from 'react'
// import { main } from 'ts-node/dist/bin'

const SignUpPage = () => {
  return (
    <main className='auth-page'><SignUp/></main>
  )
}

export default SignUpPage