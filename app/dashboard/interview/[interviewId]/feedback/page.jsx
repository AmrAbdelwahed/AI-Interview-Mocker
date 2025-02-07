"use client"
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({params}) {
  const [feedBackList, setFeedBackList] = useState([]) // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getFeedback()
  }, [])

  const getFeedback = async () => {
    try {
      const result = await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id)
      
      setFeedBackList(result)
    } catch (error) {
      console.error('Error fetching feedback:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate overall rating
  const calculateOverallRating = () => {
    if (!feedBackList.length) return 0
    
    const totalScore = feedBackList.reduce((sum, item) => sum + Number(item.rating), 0)
    const averageScore = totalScore / feedBackList.length
    
    // Round to 1 decimal place
    return Math.round(averageScore * 10) / 10
  }

  if (isLoading) {
    return <div className="p-10">Loading...</div>
  }

  return (
    <div className='p-10'>
      {feedBackList.length === 0 ? (
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback record found</h2>
      ) : (
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
          <h2 className='text-primary text-lg my-3'>
            Your overall interview rating: <strong>{calculateOverallRating()}/10</strong>
          </h2>
          <h2 className='text-sm text-gray-500'>
            Find below Interview questions with correct answers, your answer and feedback for improvement
          </h2>
          
          {feedBackList.map((item, index) => (
            <Collapsible key={index} className='mt-7'>
              <CollapsibleTrigger className='p-2 w-full gap-10 bg-secondary rounded-lg flex justify-between my-2 text-left'>
                {item.question} <ChevronsUpDown className='h-5 w-5' />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className='flex flex-col gap-2'>
                  <h2 className='text-red-500 p-2 border rounded-lg'>
                    <strong>Rating: </strong>{item.rating}
                  </h2>
                  <h2 className='p-2 border bg-red-50 rounded-lg text-sm text-red-900'>
                    <strong>Your Answer: </strong>{item.userAns}
                  </h2>
                  <h2 className='p-2 border bg-green-50 rounded-lg text-sm text-green-900'>
                    <strong>Correct Answer: </strong>{item.correctAns}
                  </h2>
                  <h2 className='p-2 border bg-blue-50 rounded-lg text-sm text-primary'>
                    <strong>Feedback: </strong>{item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}
      <Button onClick={() => router.replace('/dashboard')} className='my-7'>
        Go Home
      </Button>
    </div>
  )
}

export default Feedback