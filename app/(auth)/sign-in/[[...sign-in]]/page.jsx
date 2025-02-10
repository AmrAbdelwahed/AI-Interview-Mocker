// app/sign-in/[[...sign-in]]/page.js
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left section - Hero */}
        <div className="hidden w-1/2 lg:block">
          <div className="relative flex h-full items-center bg-primary">
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hero-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-pattern)" />
              </svg>
            </div>
            
            <div className="relative px-16 py-12">
              <div className="mb-12">
                <a
                  className="inline-flex size-24 items-center justify-center rounded-full bg-white text-primary sm:size-40"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <Image src="/logo.svg" width={300} height={300} alt="logo" />
                </a>
              </div>
              
              <div className="max-w-md">
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Prepare for Success
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-blue-100">
                  Practice with our AI-powered mock interviews and get real-time feedback to improve your interview skills.
                </p>
                
                <div className="mt-12 space-y-4">
                  {['Real-time AI feedback', 'Industry-specific questions', 'Performance analytics'].map((feature) => (
                    <div key={feature} className="flex items-center">
                      <svg className="h-6 w-6 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-blue-100">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right section - Sign In */}
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="w-full max-w-md px-8">
            {/* Remove the logo from here since it will be inside the SignIn component */}
            
            <SignIn 
              appearance={{
                layout: {
                  showOptionalFields: false,
                  socialButtonsVariant: "iconButton",
                  socialButtonsPlacement: "top",
                  helpPageUrl:"/",
                  logoImageUrl: "/logo.svg", // Add the logo URL here
                  logoPlacement: "inside", // Change to inside
                },
                elements: {
                  rootBox: "w-full",
                  card: "w-full max-w-md bg-white shadow-lg rounded-lg p-6",
                  headerTitle: "text-2xl font-semibold text-gray-900 text-center",
                  headerSubtitle: "hidden", // Hide the subtitle if any
                  // Style the logo container to appear below the title
                  logoBox: "mt-4 mb-6 flex justify-center",
                  logoImage: "w-48 h-32", // Adjust size as needed
                  form: "w-full space-y-4",
                  formFieldInput: "w-full rounded-lg border border-gray-300 p-3 focus:ring-blue-500 focus:border-blue-500",
                  formFieldLabel: "block text-sm font-medium text-gray-700",
                  formFieldInputShowPasswordButton: "absolute right-2 top-1/2 transform -translate-y-3",
                  formButtonPrimary: "w-full bg-[#4845D2] hover:bg-[#3b38b0] text-white font-semibold py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#4845D2] focus:ring-offset-2",
                  socialButtons: "flex justify-center space-x-4",
                  socialButtonsIconButton: "border border-gray-300 rounded-lg p-2 hover:bg-gray-400",
                  footer: "hidden",
                  footerAction: "hidden",
                },
                variables: {
                  borderRadius: '0.5rem',
                  colorPrimary: '#4845D2',
                  colorText: '#111827',
                  colorTextSecondary: '#4b5563',
                  colorBackground: '#ffffff',
                  fontFamily: 'inherit',
                }
              }}
            />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/sign-up" className="font-medium text-primary hover:text-primary/90">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}