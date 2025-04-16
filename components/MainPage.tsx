import Link from "next/link";

export default function MainPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 flex items-center justify-center">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)]" />
            <section className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-10 text-center">
                <header className="space-y-6">
                    <h1 className="text-5xl font-bold tracking-tight sm:text-7xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                        AI Agents
                    </h1>
                    <p className="max-w-[600px] text-lg text-gray-600 md:text-xl/relaxed xl:text-2xl/relaxed">
                        <br />
                        <span className="text-gray-500 text-sm">
                            Build on your favourite LLM&apos;s <br />(Anthropic, ChatGPT, Gemini, Llama, anthropic, NVIDIA).
                        </span>
                    </p>
                </header>
                <section className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col items-center space-y-10 text-center">

                    <span className="text-gray-900 text-2xl">
                        Available Bot&apos;s.
                    </span>
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
                                // eslint-disable-next-line react/jsx-key
                                <Link href={{
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
                </section>
                {/* <button
          className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
          Sign Up
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </button> */}
            </section>
        </main >
    )
}