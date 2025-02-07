import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
      // Full page container with gradient background
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="flex min-h-screen">
          {/* Left section - Hero */}
          <div className="hidden w-1/2 lg:block">
            <div className="relative flex h-full items-center bg-primary">
              {/* Decorative background pattern */}
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
              
              {/* Content container */}
              <div className="relative px-16 py-12">
                {/* Logo */}
                <div className="mb-12">
                  <a
                    className="inline-flex size-24 items-center justify-center rounded-full bg-white text-primary sm:size-40"
                    href="/"
                  >
                    <span className="sr-only">Home</span>
                    <Image src="/logo.svg" width={300} height={300} alt="logo" />
                  </a>
                </div>
                
                {/* Hero content */}
                <div className="max-w-md">
                  <h1 className="text-4xl font-bold tracking-tight text-white">
                    Prepare for Success
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-blue-100">
                    Practice with our AI-powered mock interviews and get real-time feedback to improve your interview skills.
                  </p>
                  
                  {/* Features list */}
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
              {/* Mobile logo */}
              <div className="mb-8 text-center lg:hidden">
                <Image
                  src="/logo.svg"
                  width={200}
                  height={100}
                  alt="logo"
                  className="mb-6 mx-auto"
                />
              </div>
              
              {/* Logo on top of sign in card */}
              <div className="mb-8 text-center">
                <Image
                  src="/logo.svg"
                  width={150}
                  height={75}
                  alt="logo"
                  className="mb-6 mx-auto"
                />
              </div>
              
              {/* Sign In Component */}
              <SignUp 
                appearance={{
                  layout: {
                    showOptionalFields: false,
                    socialButtonsVariant: "iconButton",
                    socialButtonsPlacement: "top"
                  },
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-lg p-0 w-full",
                    socialButtonsIconButton: "border border-gray-300 hover:bg-gray-50",
                    formButtonPrimary: 
                      "w-full bg-blue hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    formFieldInput: 
                      "w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                    formFieldLabel: "font-lg text-gray-700",
                    footer: "hidden",
                    formFieldInputShowPasswordButton: "absolute right-2 top-1/2 transform -translate-y-4",
                    footerAction: "hidden",
                    card: `
                      w-full 
                      bg-white 
                      shadow-none 
                      p-10
                    `,
                    main: `
                      w-full
                      p-0
                    `,
                    form: `
                      w-full 
                      space-y-2
                    `,
                    socialButtons: `
                      flex 
                      justify-center 
                      space-x-4
                    `,
                  },
                  variables: {
                    borderRadius: '0.5rem',
                    colorPrimary: '#2563eb',
                    colorText: '#111827',
                    colorTextSecondary: '#4b5563',
                    colorBackground: '#ffffff',
                    fontFamily: 'inherit',
                  }
                }}
              />
              
              {/* Custom footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Already have have an account?{' '}
                  <a href="/sign-in" className="font-medium text-primary hover:text-primary/90">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }