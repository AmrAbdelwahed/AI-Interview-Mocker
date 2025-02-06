"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'

function StartInterview({params}) {

    const [interviewData, setInterviewData] = useState({})
    const [mockInterviewQuestion, SetMockInterviewQuestion] = useState([])
    const [ActiveQuestionIndex, setActiveQuestionIndex] = useState(0)

    useEffect(() => {
        GetInterviewDetails()
    },[])

//Used to get interview details by mockId

    const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        const JsonMockResponse = JSON.parse(result[0].jsonMockResp)
        SetMockInterviewQuestion(JsonMockResponse)
        
        console.log(JsonMockResponse)
        setInterviewData(result[0])
    }

  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion} 
            ActiveQuestionIndex={ActiveQuestionIndex}
            />

            {/* Video/Audio Recording */}
            <RecordAnswerSection 
            mockInterviewQuestion={mockInterviewQuestion} 
            ActiveQuestionIndex={ActiveQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>

            {ActiveQuestionIndex>0 && 
            <Button onClick={()=>setActiveQuestionIndex(ActiveQuestionIndex-1)}>Previous Question</Button>}

            {ActiveQuestionIndex != mockInterviewQuestion?.length-1 && 
            <Button onClick={()=>setActiveQuestionIndex(ActiveQuestionIndex+1)}>Next Question</Button>}

            {ActiveQuestionIndex==mockInterviewQuestion?.length-1 && 
            <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button>End Interview</Button>
            </Link>}

        </div>
    </div>
  )
}

export default StartInterview