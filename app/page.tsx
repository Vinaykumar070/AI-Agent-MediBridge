'use client'
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import LoginPage from "@/components/LoginPage";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]" />
      <section className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-10 text-center">
        <header className="space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            AI Agents
          </h1>
        </header>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center">
            <a href="#" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-10 h-10 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-6 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button
                    type="submit"
                    onClick={() => redirect("/dashboard/MediBridge")}
                    className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    Login
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  {/* <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button> */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <header className="space-y-6">
          <span className="text-gray-900 text-2xl">
            Available Bot&apos;s.
          </span> <br />
          <div key='AVbots' className="flex gap-2">
            {[
              { boat: "HR", description: "Real-time streamed responses", color: 'bg-blue-500' },
              {
                boat: "Ecommerce",
                description: "Search Products and Order history",
                color: 'bg-rose-400'
              },
              { boat: "Booking", description: "Powered by Your Favourite LLM's", color: 'bg-cyan-500' },
              { boat: "Food", description: "Powered by Your Favourite LLM's", color: 'bg-red-500' },
              { boat: "Education", description: "Powered by Your Favourite LLM's", color: 'bg-indigo-500' },
              { boat: "Banking", description: "Powered by Your Favourite LLM's", color: 'bg-pink-500' },
              { boat: "Inventory", description: "Real-time streamed responses", color: 'bg-amber-500' },
              { boat: "Insurance", description: "Powered by Your Favourite LLM's", color: 'bg-teal-500' },
              { boat: "Calculator", description: "Powered by Your Favourite LLM's", color: 'bg-green-500' },
            ].map(({ boat, description, color }) => {
              const className: string = `rounded-full flex items-center ${color} py-0.5 pr-2.5 pl-1.5 border border-transparent text-sm text-white transition-all shadow-sm`;
              const path = `/dashboard/${boat.trim()}`
              return (
                <Link
                  key={boat}
                  href={{
                    pathname: path,
                  }}
                >
                  <div className={className} key={boat}>
                    <div className="h-5 w-5 mr-2">
                      <img
                        alt="Tania Andrew"
                        src="https://picsum.photos/200"
                        className="h-full w-full rounded-full object-cover object-center"
                      />
                    </div>
                    {boat}
                  </div>
                </Link>
              )
            })}
          </div>
        </header>
        <p className="max-w-[600px] text-lg text-gray-600 md:text-xl/relaxed xl:text-2xl/relaxed">
          <span className="text-gray-500 text-sm">
            Build on your favourite LLM&apos;s <br />(Anthropic, ChatGPT, Gemini, Llama, anthropic, NVIDIA).
          </span>
        </p>

        {/* <button
          className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          Sign Up
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button> */}
      </section>
      {/* <LoginPage /> */}
    </main >
  );
}
