import { SignIn } from '@clerk/nextjs'
import React from 'react'
// import { main } from 'ts-node/dist/bin'

const SignInPage = () => {
  return (
    <main className='auth-page'><SignIn /></main>
  )
}

export default SignInPage