"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { MockInterview } from '@/utils/schema'
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [jobPosition, setJobPosition] = React.useState('')
    const [jobDesc, setJobDesc] = React.useState('')
    const [jobExperience, setJobExperience] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [jsonResponse, setJsonResponse] = React.useState([])
    const { user, isLoaded, isSignedIn } = useUser()
    const router = useRouter()

    // Handle unauthorized access
    const handleDialogOpen = () => {
        if (!isLoaded) return // Wait for auth state to load
        if (!isSignedIn) {
            router.push('/sign-in')
            return
        }
        setOpenDialog(true)
    }

    const onSubmit = async(e) => {
        // Double check auth state before submission
        if (!isSignedIn) {
            router.push('/sign-in')
            return
        }

        setLoading(true)
        e.preventDefault()

        try {
            const inputPrompt = "Job Position: "+jobPosition+", Job Description: "+jobDesc+", Years of experience: "+jobExperience+",\n\nBased on this information, please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" most relevant interview questions with answers in JSON format. Give questions and answers as fields in JSON"

            const result = await chatSession.sendMessage(inputPrompt)
            const MockJsonResp = result.response.text().replace('```json','').replace('```','')
            setJsonResponse(MockJsonResp)

            if (MockJsonResp) {
                const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('YYYY-MM-DD HH:mm')
                }).returning({mockId: MockInterview.mockId});

                if (resp) {
                    setOpenDialog(false)
                    router.push('/dashboard/interview/'+resp[0]?.mockId)
                }
            } else {
                console.error("Error in generating mock interview")
            }
        } catch (error) {
            console.error("Error submitting interview:", error)
        } finally {
            setLoading(false)
        }
    }

    // Show loading state while auth is loading
    if (!isLoaded) {
        return (
            <div className='p-10 border rounded-lg bg-secondary'>
                <LoaderCircle className='animate-spin mx-auto'/>
            </div>
        )
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary
            hover:scale-105 hover:shadow-md transition duration-500 ease-in-out cursor-pointer'
            onClick={handleDialogOpen}>
                <h2 className='text-lg text-center'>+ Add New</h2>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about your job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>        
                                <div>
                                    <h2 className='text-gray-500'>Add details about your job position/role, Job description and years of experience</h2>
                                    
                                    <div className='mt-7 my-2'>
                                        <label>Job Position/Role</label>
                                        <Input placeholder='Ex. Full Stack Developer' required
                                        onChange={(e) => setJobPosition(e.target.value)}/>
                                    </div>

                                    <div className='my-3'>
                                        <label>Job Description/ Tech Stack (In Short)</label>
                                        <Textarea placeholder='Ex. React, Angular, NodeJs, MySql etc' required
                                        onChange={(e) => setJobDesc(e.target.value)}/>
                                    </div>

                                    <div className='my-3'>
                                        <label>Years of experience</label>
                                        <Input placeholder='5' type='number' max='100' required
                                        onChange={(e) => setJobExperience(e.target.value)}/>
                                    </div>
                                </div>

                                <div className='flex justify-end mt-5'>
                                    <Button type='button' variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type='submit' disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin'/> Generating from AI 
                                            </> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview