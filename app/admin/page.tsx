'use server'
import React, { useRef, useState } from 'react'
import { GraphQLClient } from 'graphql-request'

import Footer from "../components/Footer";
import Form from "../components/Form";



//import { auth, User } from "@clerk/nextjs/server";
import { useOrganization, useUser, Protect, ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton, SignOutButton, currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import ShowPoints from '../components/ShowPoints';

export default async function Home() {


    const { userId } = auth();
    const adminList = ["user_2d5q19e1ZVAOxJGvF3JDq3LjUW3"]

    const { orgRole } = auth();

    const user = await currentUser();
  
  return (
    <>
    
<main className="font-primary bg-secondary text-primary flex min-h-screen flex-col items-center justify-between lg:p-24 py-24">
      <div className="relative flex place-items-center flex-col -mt-12 w-96 lg:w-auto">
      <h1 className={`mb-3 lg:text-6xl text-2xl text-center text-slate-500`}>Stephens Hall United Leaderboard</h1>
      <h2 className={`mb-3 lg:text-8xl text-4xl font-semibold text-center`}>ADMIN WINDOW</h2>
      <div className="h-screen">
        <div className="m-auto flex place-items-center flex-col pb-2">
        <SignedIn>
        <UserButton afterSignOutUrl="/"/> 
        {/* <p>{userId}</p> */}
        <SignOutButton />
        <h2 className="lg:text-4xl text-xl">Welcome {user?.firstName}</h2>
        </SignedIn>
        
        </div>
        {/* <Protect
    role="org:admin
    fallback={<p>You do not have the permissions to add points.</p>}
    >
        <Form />
        </Protect> */}
        {adminList.includes(userId ? userId : "") ? 
          <>
          <Form>
          <ShowPoints />
          </Form>
          </>
          : <p>You do not have the permissions to add points.</p>}
       
        
      </div>
      </div>

    </main>
    <Footer/>
    </>   
    
  )
}
