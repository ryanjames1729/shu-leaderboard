'use client'

import { getPoints, updatePoints } from "../../app/actions";
import React, { FormEvent, useRef, useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import ShowPoints from '../components/ShowPoints'

import Link from 'next/link'


export default async function Form({
    children,
}: {
    children: React.ReactNode
}) {

    const [messages, setMessages] = useState<string[]>([])
  
    return (
       
        <form className="lg:px-0 px-2 mx-auto grid grid-cols-1" onSubmit={async (event) => {
            event.preventDefault()
            const result = await updatePoints(event.currentTarget.bluePointsAdded.value, event.currentTarget.redPointsAdded.value)
            setMessages(await result)
        }}>
            <div className="grid grid-cols-2">
            <div className="mb-5 grid grid-cols-2">
                <label htmlFor="Cardinal" className="text-xl lg:text-3xl">Blue:</label>
                <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text" id="cardinalPointsAdded" name="cardinalPointsAdded"/>
                
            </div>
           
            <div className="mb-5 grid grid-cols-2">
                <label htmlFor="Pines" className="text-xl lg:text-3xl">Red:</label>
                <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text" id="pinesPointsAdded" name="pinesPointsAdded"/>
       
            </div>
            
            </div>
            {children}
            
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <br/>
            <br/>
            {/* button to send to home */}
            <Link href="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Home</Link>
            
            <div>
                {messages ? messages.map((message, index) => (
                    <p key={index}>{message}</p>
                )) : null}
            </div>
           
    

            

        </form>
    )
}
