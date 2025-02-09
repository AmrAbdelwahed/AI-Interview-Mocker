"use client"
import React, { useEffect } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Mic, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { toast } from "sonner"
import { chatSession } from '@/utils/GeminiAIModel'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion, ActiveQuestionIndex, interviewData}) {
    const [userAnswer, setUserAnswer] = React.useState('')
    const {user} = useUser()
    const [loading, setLoading] = React.useState(false)
    const [completeTranscript, setCompleteTranscript] = React.useState('')

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    // Update the complete transcript whenever results change
    useEffect(() => {
        if (results.length > 0) {
            // Combine all transcripts into a single string
            const fullTranscript = results
                .map(result => result.transcript)
                .join(' ')
                .trim()
            setCompleteTranscript(fullTranscript)
        }
    }, [results])

    // Only update userAnswer when recording stops
    useEffect(() => {
        if (!isRecording && completeTranscript.length > 10) {
            setUserAnswer(completeTranscript)
            UpdateUserAnswer()
        }
    }, [isRecording, completeTranscript])

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText()
        } else {
            // Clear previous results when starting new recording
            setResults([])
            setCompleteTranscript('')
            setUserAnswer('')
            startSpeechToText()
        }
    }

    const UpdateUserAnswer = async () => {
        setLoading(true)
        try {
            const feedbackPrompt = "Question:" + mockInterviewQuestion[ActiveQuestionIndex].question + "" + 
                "User Answer:" + completeTranscript + ",\n\nPlease provide feedback on user's answer based on the question and answer provided above. Give us rating out of 10 for the user's answer in just 3-5 lines. Provide feedback in JSON format with rating field and feedback field."

            const result = await chatSession.sendMessage(feedbackPrompt)
            const MockJsonResp = result.response.text().replace('```json','').replace('```','')
            const JsonFeedbackResp = JSON.parse(MockJsonResp)

            const resp = await db.insert(UserAnswer)
                .values({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestion[ActiveQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[ActiveQuestionIndex]?.answer,
                    userAns: completeTranscript,
                    feedback: JsonFeedbackResp?.feedback,
                    rating: JsonFeedbackResp?.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    answeredAt: moment().format('YYYY-MM-DD HH:mm')
                })

            if (resp) {
                toast('Your answer has been recorded successfully')
                setResults([])
                setCompleteTranscript('')
                setUserAnswer('')
            }
        } catch (error) {
            toast.error('Error recording answer')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col my-20 justify-center items-center bg-black p-5 rounded-lg'>
                <Image src={'/webcam.png'} width='200' height='200' alt='Webcam' className='absolute'/>
                <Webcam 
                    mirrored={true}
                    style={{
                        height: 325,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <Button 
                disabled={loading} 
                variant='outline' 
                className='my-5'
                onClick={StartStopRecording}
            >
                {isRecording ? 
                    <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                        <StopCircle /> Stop Recording
                    </h2>
                    : 
                    <h2 className='text-primary flex gap-2 items-center font-bold'>
                        <Mic />Start Recording
                    </h2>       
                }
            </Button>        
        </div>
    )
}

export default RecordAnswerSection