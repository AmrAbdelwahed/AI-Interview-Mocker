"use client"
import React, { useEffect, useRef } from 'react'
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
    const recognitionRef = useRef(null)

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
        useLegacyResults: false,
        speechRecognitionProperties: {
            lang: 'en-US', // Set specific language
            interimResults: true,
            maxAlternatives: 3, // Get multiple alternatives for better accuracy
        },
        // Enhanced configuration
        speechRecognitionConfig: {
            // Higher sample rate for better quality
            sampleRate: 48000,
            // Optimize for command and search terms
            webkitSpeechRecognitionConfig: {
                continuous: true,
                interimResults: true
            }
        },
        // Handler for recognition errors
        onError: (error) => {
            console.error('Speech recognition error:', error)
            toast.error('Speech recognition error. Please try again.')
            stopSpeechToText()
        }
    });

    // Improved transcript processing
    useEffect(() => {
        if (results.length > 0) {
            // Combine transcripts with improved text processing
            const processedTranscript = results
                .map(result => {
                    // Take the most confident result if alternatives are available
                    const transcript = result.transcript || ''
                    return transcript
                        .trim()
                        .replace(/\s+/g, ' ') // Normalize whitespace
                        .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width spaces
                })
                .join(' ')
                .trim()

            // Basic text normalization
            const normalizedTranscript = processedTranscript
                .replace(/(\w)\.(\w)/g, '$1. $2') // Fix period spacing
                .replace(/\s+/g, ' ') // Normalize spaces
                .replace(/([.!?])\s*(?=[A-Z])/g, '$1 ') // Fix sentence spacing

            setCompleteTranscript(normalizedTranscript)
        }
    }, [results])

    // Enhanced recording management
    useEffect(() => {
        if (!isRecording && completeTranscript.length > 10) {
            // Additional validation before updating
            const cleanedAnswer = completeTranscript
                .replace(/[^\w\s.,!?-]/g, '') // Remove unwanted characters
                .trim()

            if (cleanedAnswer.length >= 10) {
                setUserAnswer(cleanedAnswer)
                UpdateUserAnswer()
            }
        }
    }, [isRecording, completeTranscript])

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText()
        } else {
            try {
                // Reset state
                setResults([])
                setCompleteTranscript('')
                setUserAnswer('')
                
                // Check for microphone permission
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                stream.getTracks().forEach(track => track.stop())
                
                // Start recording with noise suppression if supported
                if (navigator.mediaDevices.getSupportedConstraints().noiseSuppression) {
                    const enhancedStream = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            noiseSuppression: true,
                            echoCancellation: true,
                            autoGainControl: true,
                        }
                    })
                    enhancedStream.getTracks().forEach(track => track.stop())
                }
                
                startSpeechToText()
                toast.success('Recording started. Speak clearly...')
            } catch (err) {
                console.error('Microphone access error:', err)
                toast.error('Unable to access microphone. Please check permissions.')
            }
        }
    }

    const UpdateUserAnswer = async () => {
        setLoading(true)
        try {
            const feedbackPrompt = `Question: ${mockInterviewQuestion[ActiveQuestionIndex].question}\n\nUser Answer: ${completeTranscript}\n\nPlease provide feedback on user's answer based on the question and answer provided above. Give us rating out of 10 for the user's answer in just 3-5 lines. Provide feedback in JSON format with rating field and feedback field.`

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
                toast.success('Answer recorded successfully')
                setResults([])
                setCompleteTranscript('')
                setUserAnswer('')
            }
        } catch (error) {
            console.error('Error recording answer:', error)
            toast.error('Error recording answer. Please try again.')
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
            {error && (
                <p className="text-red-500 mt-2">
                    Error: {error.message || 'Speech recognition failed'}
                </p>
            )}
            {interimResult && isRecording && (
                <p className="text-gray-500 mt-2 italic">
                    Listening: {interimResult}
                </p>
            )}
        </div>
    )
}

export default RecordAnswerSection