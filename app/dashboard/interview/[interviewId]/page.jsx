"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {

    const [interviewData, setInterviewData] = React.useState({})
    const [webCamEnabled, setWebCamEnabled] = React.useState(false)

    useEffect(() => {
        GetInterviewDetails()
    }, [])

    //Used to get interview details by mockId

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))


        console.log(result)
        setInterviewData(result[0])
    }

  return (
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>

            <div className='flex flex-col my-7 gap-5'>
                <div className='flex flex-col p-5 rounded-lg border gap-5 bg-secondary'>
                    <h2 className='text-lg'> <strong> Job Role/Job Position: </strong> {interviewData?.jobPosition} </h2>
                    <h2 className='text-lg'> <strong> Job Description/Tech Stack: </strong> {interviewData?.jobDesc} </h2>
                    <h2 className='text-lg'> <strong> Years of Experience: </strong> {interviewData?.jobExperience} </h2>
                </div>
                <div className='flex flex-col p-5 rounded-lg border-yellow-300 bg-yellow-100'>
                    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><span>Information</span></h2>
                    <h2 className='mt-3 text-yellow-600'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                </div>
            </div>
        <div className='flex flex-col'> 
            {webCamEnabled?  
            <Webcam 
            onUserMedia={() => setWebCamEnabled(true)}
            OnuserMediaError={() => setWebCamEnabled(false)}
            mirrored={true}
            style={{
                height:300,
                width:300
            }}/>
            : 
            <>
            <WebcamIcon className='w-full h-72 my-7 p-20 bg-secondary rounded-lg border'/>
            <Button variant='ghost' className='w-full' onClick={()=>setWebCamEnabled(true)}> Enable Web Cam and Microphone</Button>
            </>
            }
            
            <div className='flex justify-end items-end mt-12'>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button >Start Interview</Button>
            </Link>
        </div>
        
        </div>

        
            
        </div>
        
    </div>
    
  )
}

export default Interview