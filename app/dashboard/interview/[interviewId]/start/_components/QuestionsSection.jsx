import { MockInterview } from '@/utils/schema'
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion, ActiveQuestionIndex}) {

    const textTospeech=(text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text)
            window.speechSynthesis.speak(speech)
        }else{
            alert('Your browser does not support text to')

        }
    }

  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-5'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question, index) => (
                    <h2 className={`p-2 rounded-full
                    text-xs md:text-sm text-center cursor-pointer
                    ${ActiveQuestionIndex===index?'bg-primary text-white':'bg-secondary'}
                    `}> Question {index+1}</h2>
            ))}
        </div>
        <h2 className='my-5 text-md md:text-lg'> {mockInterviewQuestion[ActiveQuestionIndex]?.question}</h2>
        <Volume2  onClick={()=>textTospeech(mockInterviewQuestion[ActiveQuestionIndex]?.question)} className='w-6 h-6 cursor-pointer'/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-2 items-center text-primary'>
                <Lightbulb className='w-5 h-5'/>
                <strong>Note: </strong>
            </h2>
            <h2 className='text-sm text-primary my-2'>
                {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
        </div>

    </div>
  )
}

export default QuestionsSection