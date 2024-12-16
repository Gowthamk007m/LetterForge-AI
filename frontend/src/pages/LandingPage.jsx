import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Briefcase, PenTool, Zap, ChevronRight, ChevronsDown } from "lucide-react"

export default function LandingPage() {
  const [currentView, setCurrentView] = useState('home')

  const renderView = () => {
    switch(currentView) {
      case 'pricing':
        return <Pricing />
      default:
        return (
          <div className="snap-y snap-mandatory h-screen overflow-y-scroll scrollbar-hide">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black snap-start h-screen flex items-center">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                      Experience The Future With AI
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                      RightNow AI uses advanced AI to help you create compelling cover letters and precise job descriptions in minutes.
                    </p>
                  </div>
                  <div className="space-x-4">
                    <a className="text-white font-bold underline underline-offset-8 hover:underline-offset-4 cursor-pointer">Get Started</a>
                    <Button variant="outline" className="from-gray-700 rounded-none to-white border-none text-black">Learn More</Button>
                  </div>
                  
                  <div className="relative top-14 rounded-full animate-bounce">
                    <ChevronsDown className="h-20 w-20" />
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-black snap-start h-screen flex items-center">
              <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4 lg:mb-12 lg:text-6xl bg-clip-text text-transparent bg-gradient-to-t from-white to-gray-500">Our AI Tools</h2>
                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                  <div className="flex flex-col items-center space-y-0 lg:space-y-3 p-1 lg:p-6 bg-gradient-to-b from-gray-500 to-black rounded-lg border border-gray-700 transition-transform hover:scale-105 hover:shadow-lg hover:shadow-gray-100/20">
                    <FileText className="h-12 w-12 text-white" />
                    <h3 className="text-xl font-bold text-white">CoverLetter Pro</h3>
                    <p className="text-center text-gray-400">Generates tailored cover letters that highlight your skills and experience.</p>
                  </div>
                  <div className="flex flex-col items-center space-y-0 lg:space-y-3 p-1 lg:p-6   bg-gradient-to-b from-gray-500 to-black rounded-lg border border-gray-700 transition-transform hover:scale-105 hover:shadow-lg hover:shadow-gray-100/20">
                    <Briefcase className="h-12 w-12 text-white" />
                    <h3 className="text-xl font-bold text-white">JobDesc Wizard</h3>
                    <p className="text-center text-gray-400">Creates detailed and attractive job descriptions for any role.</p>
                  </div>
                  <div className="flex flex-col items-center space-y-0 lg:space-y-3 p-1 lg:p-6   bg-gradient-to-b from-gray-500 to-black rounded-lg border border-gray-700 transition-transform hover:scale-105 hover:shadow-lg hover:shadow-gray-100/20">
                    <PenTool className="h-12 w-12 text-white" />
                    <h3 className="text-xl font-bold text-white">ResumeEnhancer</h3>
                    <p className="text-center text-gray-400">Optimizes your resume to match job requirements and stand out.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-black snap-start h-screen flex items-center">
              <div className="container px-4 md:px-6">
                <div className="grid gap-10 px-10 md:gap-16 md:grid-cols-2">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                      Land Your Dream Job Faster
                    </h2>
                    <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Our AI-powered tools help you create professional documents that catch employers' attention and increase your chances of getting hired.
                    </p>
                    <Button className="inline-flex items-center bg-white text-black hover:bg-gray-200 transition-colors">
                      Try It Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-[300px] h-[300px] bg-gradient-to-r from-white to-gray-500 rounded-full flex items-center justify-center animate-pulse">
                      <Zap className="h-24 w-24 text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white snap-start h-screen flex items-center">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                      Ready to Boost Your Career?
                    </h2>
                    <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl">
                      Join RightNow AI today and create impressive cover letters and job descriptions in minutes.
                    </p>
                  </div>
                  <div className="w-full max-w-sm space-y-2">
                    <form className="flex space-x-2">
                      <Input
                        className="max-w-lg flex-1 bg-gray-900 text-white placeholder-gray-500"
                        placeholder="Enter your email"
                        type="email"
                      />
                      <Button className="bg-white text-black hover:bg-gray-200 transition-colors" type="submit">
                        Sign Up
                      </Button>
                    </form>
                    <p className="text-xs text-gray-400">
                      By signing up, you agree to our Terms & Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-gray-100">
      <header className="px-4 lg:px-6 h-14 bg-gray-950 flex items-center border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <button 
            className="text-sm font-medium hover:text-white transition-colors cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            Features
          </button>
          <button 
            className="text-sm font-medium hover:text-white transition-colors cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            Tools
          </button>
          <button 
            className="text-sm font-medium hover:text-white transition-colors cursor-pointer" 
            onClick={() => setCurrentView('pricing')}
          >
            Pricing
          </button>
          <button className="text-sm font-medium hover:text-white transition-colors cursor-pointer">
            Contact
          </button>
        </nav>
      </header>
      <main className="flex-1">
        {renderView()}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800 bg-black">
        <p className="text-xs text-gray-400">© 2023 RightNow AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          {/* Additional footer links can be added here */}
        </nav>
      </footer>
    </div>
  )
}