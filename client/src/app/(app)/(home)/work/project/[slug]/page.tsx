"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import GradientBackground from "@/components/ui/background"
import { SCHOOL_PROJECTS } from "@/lib/constants"

export default function ProjectPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Trouver le projet correspondant dans SCHOOL_PROJECTS
  const project = SCHOOL_PROJECTS.find(p => p.slug === slug || p.id === slug)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!project) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <div className="relative z-30 bg-white border-4 border-black p-8 rounded-xl max-w-md">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <p className="mb-4">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link 
            href="/work" 
            className="inline-block bg-[#f67a45] text-white px-4 py-2 rounded-md border-2 border-black"
          >
            Retour aux travaux
          </Link>
        </div>
      </main>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GradientBackground />

      <div className="relative z-30 flex flex-col items-center justify-start py-4 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4">
        <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto mb-6">
          {/* Corner elements - L-shaped design */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>

          {/* Top-right corner */}
          <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-left corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>

          {/* Bottom-right corner */}
          <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          <div className="p-3 sm:p-4 md:p-6 lg:p-6">
            <div className="mb-6">
              <Link
                href="/work"
                className="flex items-center text-[#3C3C3C] hover:text-[#f67a45] transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour aux travaux
              </Link>
            </div>

            {/* Project Article */}
            <article className="relative">
              {/* <div className="absolute -top-10 sm:-top-12 left-1 sm:left-2">
                <div 
                  className="text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap"
                  style={{ backgroundColor: project.color || '#F67A45' }}
                >
                  {project.category}
                </div>
              </div> */}

              {/* Project header */}
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#2D2D2D] leading-tight">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center text-[#666] mb-6">
                  <span className="mr-4">Année : {project.year}</span>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      {project.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-[#f8f8f8] px-2 py-1 text-xs rounded-full border border-[#eaeaea]"
                          style={{ backgroundColor: `${project.color}20` || '#F67A4520' }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Image gallery */}
              <div className="mb-8 relative border-4 border-black overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-xl -z-10"></div>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover"
                  />
                  
                  {/* Navigation buttons */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full border-2 border-black hover:bg-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full border-2 border-black hover:bg-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                {/* Image indicators */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full border border-black ${
                          index === currentImageIndex ? 'bg-white' : 'bg-black/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project description */}
              <div className="text-lg sm:text-xl text-[#444] mb-8 font-medium">
                {project.description}
              </div>

              {/* Project objectives and skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 border-2 border-black rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Objectifs du projet</h3>
                  <ul className="list-disc pl-5 space-y-2 text-[#3C3C3C]">
                    {project.objectives && project.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-6 border-2 border-black rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Compétences développées</h3>
                  <ul className="list-disc pl-5 space-y-2 text-[#3C3C3C]">
                    {project.skills && project.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Project footer */}
              <div className="mt-12 pt-6 border-t border-[#eaeaea]">
                <div className="flex justify-end">
                  <Link
                    href="/work"
                    className="relative inline-block group"
                  >
                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                    <div 
                      className="relative px-4 py-2 border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5"
                      style={{ backgroundColor: project.color || '#F67A45', color: '#ffffff' }}
                    >
                      Voir tous les projets
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  )
} 