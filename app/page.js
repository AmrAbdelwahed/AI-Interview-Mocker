import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-10 text-center">
      {/* Logo */}
      <Image src="/logo.svg" width={200} height={100} alt="logo" className="mb-6" />

      {/* Headline */}
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to MockView AI</h1>
      <p className="text-gray-600 max-w-xl mb-6">
        Prepare for your dream job with AI-powered mock interviews. Get instant feedback, improve your responses, and boost your confidence.
      </p>

      {/* Call to Action */}
      <Link href={'/dashboard'}>
        <Button size="lg" className="px-6 py-3 text-lg">Get Started</Button>
      </Link>
    </div>
  );
}