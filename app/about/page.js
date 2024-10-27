import * as React from "react"
import { Github, Linkedin } from "lucide-react"
import NavBar from "../_components/NavBar/NavBar"
const teamMembers = [
    {
        name: "Silvia Hua",
        github: "https://github.com/silvhua",
        linkedin: "https://www.linkedin.com/in/silviahua/",
        headline: "Kinesiologist-turned-software developer"
    },
    {
        name: "Shwetha",
        github: "",
        linkedin: "https://www.linkedin.com/in/svedavinayagam/",
        headline: "Aspiring Data Analyst & Software developer"
    },
    {
        name: "Gabriel Q",
        github: "https://github.com/gabriellsq",
        linkedin: "https://www.linkedin.com/in/gabriellsq/",
        headline: "Data Scientist & Machine Learning Engineer"
    },
    {
        name: "Sandaru W",
        github: "",
        linkedin: "https://www.linkedin.com/in/sandaru-welikala/",
        headline: "Software engineer & Data analyst enthusiast"
    },
    {
        name: "Qiye (Jacky) Chen",
        github: "https://github.com/jacky5124",
        linkedin: "https://www.linkedin.com/in/qiye-chen-71623879/",
        headline: "Software engineer & Machine Learning Engineer"
    },
    {
        name: "Jane Zhu",
        github: "https://github.com/Janezhuu",
        linkedin: "https://www.linkedin.com/in/zhaojin-zhu-zzj/",
        headline: "Data Analyst and enthusiast"
    },
    {
        name: "Kyung Cheol Koh",
        github: "https://github.com/kckoh",
        linkedin: "https://www.linkedin.com/in/kyungcheol-koh/",
        headline: "Software Developer"
    }
]


export default function AboutUs() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <NavBar />
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{member.name}</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{member.headline}</p>
                                        <div className="mt-3 flex space-x-3">
                                            {member.github && (
                                                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">GitHub</span>
                                                    <Github className="h-6 w-6" aria-hidden="true" />
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">LinkedIn</span>
                                                    <Linkedin className="h-6 w-6" aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}