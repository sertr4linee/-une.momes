"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import GradientBackground from '@/components/ui/background'
import { getPublicAlbums } from '@/app/actions'
import { motion, AnimatePresence } from 'framer-motion'

interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  imageCount: number
  previewImage: {
    id: string
    url: string
    caption: string | null
    order: number
  }
  createdAt: string
  updatedAt: string
}

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null)
  const [showGrid, setShowGrid] = useState(true) // Pour alterner entre grille et liste

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const result = await getPublicAlbums()
        if (result.data) {
          setAlbums(result.data)
        }
      } catch (error) {
        console.error('Error fetching albums:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [])

  const categories = Array.from(new Set(albums.map(album => album.category)))
  const filteredAlbums = selectedCategory 
    ? albums.filter(album => album.category === selectedCategory)
    : albums

  // Couleurs vives pour les catégories
  const categoryColors = {
    'Portrait': '#FF5E5B',
    'Nature': '#4CD964',
    'Urban': '#5E5CE6',
    'Architecture': '#FF9500',
    'Travel': '#BF5AF2',
    'Fashion': '#FF2D55'
  }

  // Obtenir une couleur pour une catégorie
  const getCategoryColor = (category: string) => {
    return (categoryColors as Record<string, string>)[category] || '#F67A45'
  }

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <GradientBackground />
        <motion.div 
          className="relative z-30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-lg -z-10"></div>
            <div className="bg-[#FFFBF5] border-[6px] border-black p-12 rounded-lg relative">
              <div className="flex items-center space-x-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-8 bg-[#f67a45] border-3 border-black"
                    animate={{
                      y: ["0%", "-100%", "0%"],
                      rotate: [0, 180, 360],
                      borderRadius: ["0%", "50%", "0%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
              <div className="absolute -top-3 -left-3 w-6 h-6">
                <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                <div className="absolute top-0 left-0 w-2 h-full bg-black"></div>
              </div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6">
                <div className="absolute bottom-0 right-0 w-full h-2 bg-black"></div>
                <div className="absolute bottom-0 right-0 w-2 h-full bg-black"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen">
      <GradientBackground />
      
      {/* Éléments décoratifs flottants */}
      <div className="fixed z-10 top-[15%] right-[8%] w-[100px] h-[100px] md:w-[150px] md:h-[150px] animate-float">
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={150}
          height={150}
          className="w-full h-full"
          style={{ filter: "drop-shadow(4px 8px 0px rgba(0,0,0,0.6))" }}
        />
      </div>
      
      <div className="fixed z-10 bottom-[20%] left-[10%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] animate-bounce">
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={120}
          height={120}
          className="w-full h-full"
          style={{ 
            filter: "drop-shadow(3px 6px 0px rgba(0,0,0,0.6)) hue-rotate(200deg)",
            animationDuration: "7s"
          }}
        />
      </div>
      
      {/* Hero Section */}
      <div className="relative z-30 pt-6 sm:pt-12 pb-12 sm:pb-24">
        <div className="relative w-[95%] max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-4 -left-4 transform rotate-[-5deg] z-10"
          >
            <Link
              href="/work"
              className="bg-[#FFD2BF] text-black font-bold px-4 py-2 rounded-full border-3 border-black text-base inline-flex items-center shadow-brutal-sm hover:shadow-brutal-sm-hover transition-all duration-200 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour
            </Link>
          </motion.div>

          <div className="relative border-[8px] border-black bg-white rounded-2xl p-8 md:p-12 mt-16 sm:mt-10">
            <div className="absolute inset-0 bg-black translate-x-5 translate-y-5 rounded-2xl -z-10"></div>
            
            {/* Éléments de coin */}
            <div className="absolute -top-5 -left-5 w-10 h-10">
              <div className="absolute top-0 left-0 w-full h-3 bg-black"></div>
              <div className="absolute top-0 left-0 w-3 h-full bg-black"></div>
            </div>
            <div className="absolute -top-5 -right-5 w-10 h-10">
              <div className="absolute top-0 right-0 w-full h-3 bg-black"></div>
              <div className="absolute top-0 right-0 w-3 h-full bg-black"></div>
            </div>
            <div className="absolute -bottom-5 -left-5 w-10 h-10">
              <div className="absolute bottom-0 left-0 w-full h-3 bg-black"></div>
              <div className="absolute bottom-0 left-0 w-3 h-full bg-black"></div>
            </div>
            <div className="absolute -bottom-5 -right-5 w-10 h-10">
              <div className="absolute bottom-0 right-0 w-full h-3 bg-black"></div>
              <div className="absolute bottom-0 right-0 w-3 h-full bg-black"></div>
            </div>
            
            <div className="max-w-4xl mx-auto text-center mb-12">
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative inline-block mb-8"
              >
                <div className="bg-[#f67a45] text-black font-bold px-6 py-3 rounded-full border-3 border-black transform rotate-[-3deg] text-xl">
                  📸 Ma collection
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-black relative inline-block"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Galerie Photo
                <div className="absolute -bottom-3 left-0 w-full h-2 bg-[#f67a45]"></div>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 mb-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Découvrez mes collections à travers différents univers
              </motion.p>

              {/* Options d'affichage */}
              <motion.div 
                className="flex justify-center items-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button 
                  onClick={() => setShowGrid(true)}
                  className={`relative ${showGrid ? 'opacity-100' : 'opacity-60'} transition-opacity`}
                >
                  <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md -z-10 ${showGrid ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                  <div className={`p-2 border-2 border-black rounded-md ${showGrid ? 'bg-[#FFD2BF]' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                </button>
                <button 
                  onClick={() => setShowGrid(false)}
                  className={`relative ${!showGrid ? 'opacity-100' : 'opacity-60'} transition-opacity`}
                >
                  <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-md -z-10 ${!showGrid ? 'opacity-100' : 'opacity-0'} transition-opacity`}></div>
                  <div className={`p-2 border-2 border-black rounded-md ${!showGrid ? 'bg-[#FFD2BF]' : 'bg-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </div>
                </button>
              </motion.div>

              {/* Categories */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mb-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ 
                    y: -5,
                    boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)"
                  }}
                  whileTap={{ y: 0, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                  onClick={() => setSelectedCategory(null)}
                  className={`relative px-5 py-3 rounded-full border-3 border-black transition-all ${
                    !selectedCategory ? 'bg-black text-white' : 'bg-white hover:bg-gray-50'
                  } shadow-brutal-sm text-base font-bold`}
                >
                  Tous
                </motion.button>
                
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ 
                      y: -5,
                      boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)"
                    }}
                    whileTap={{ y: 0, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-5 py-3 rounded-full border-3 border-black transition-all shadow-brutal-sm text-base font-bold`}
                    style={{ 
                      backgroundColor: selectedCategory === category ? 'black' : getCategoryColor(category),
                      color: selectedCategory === category ? 'white' : 'black'
                    }}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Albums Grid or List */}
            <AnimatePresence mode="wait">
              {showGrid ? (
                <motion.div 
                  key="grid"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredAlbums.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onHoverStart={() => setHoveredAlbum(album.id)}
                      onHoverEnd={() => setHoveredAlbum(null)}
                      whileHover={{ y: -10 }}
                    >
                      <Link href={`/work/gallery/${album.id}`}>
                        <div className="relative cursor-pointer">
                          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                          <div className="relative border-3 border-black rounded-xl overflow-hidden bg-white">
                            <div className="relative aspect-[4/3]">
                              {album.coverImage ? (
                                <Image
                                  src={album.coverImage}
                                  alt={album.title}
                                  fill
                                  className={`object-cover transition-all duration-500 ${
                                    hoveredAlbum === album.id ? 'scale-110' : 'scale-100'
                                  }`}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-gray-400 text-sm">No cover image</span>
                                </div>
                              )}
                              
                              {/* Overlay avec effet de survol */}
                              <div className={`absolute inset-0 transition-opacity duration-300 ${
                                hoveredAlbum === album.id ? 'opacity-50' : 'opacity-0'
                              }`} style={{ 
                                backgroundColor: getCategoryColor(album.category) 
                              }} />
                              
                              {/* Icône de zoom au survol */}
                              <motion.div
                                className={`absolute inset-0 flex items-center justify-center ${
                                  hoveredAlbum === album.id ? 'opacity-100' : 'opacity-0'
                                } transition-opacity duration-300`}
                                animate={{
                                  scale: hoveredAlbum === album.id ? 1 : 0.8,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="bg-white p-3 rounded-full border-2 border-black">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                  </svg>
                                </div>
                              </motion.div>
                            </div>
                            
                            <div className="p-5">
                              <div className="mb-2">
                                <span 
                                  className="inline-block px-4 py-1 text-black text-sm font-bold rounded-full border-2 border-black transform -translate-y-8 shadow-brutal-xs"
                                  style={{ backgroundColor: getCategoryColor(album.category) }}
                                >
                                  {album.category}
                                </span>
                              </div>
                              <h2 className="text-2xl font-bold mb-2 line-clamp-1">{album.title}</h2>
                              {album.description && (
                                <p className="text-gray-600 text-base line-clamp-2 mb-4">{album.description}</p>
                              )}
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {album.imageCount} photos
                                </span>
                                <motion.span 
                                  className="text-[#f67a45] font-bold flex items-center"
                                  animate={{
                                    x: hoveredAlbum === album.id ? 5 : 0
                                  }}
                                >
                                  Voir
                                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                </motion.span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="list"
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredAlbums.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                      onHoverStart={() => setHoveredAlbum(album.id)}
                      onHoverEnd={() => setHoveredAlbum(null)}
                      whileHover={{ x: 10 }}
                    >
                      <Link href={`/work/gallery/${album.id}`}>
                        <div className="relative cursor-pointer">
                          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>
                          <div className="relative border-3 border-black rounded-xl overflow-hidden bg-white">
                            <div className="flex flex-col md:flex-row">
                              <div className="relative w-full md:w-1/3 aspect-[3/2] md:aspect-square">
                                {album.coverImage ? (
                                  <Image
                                    src={album.coverImage}
                                    alt={album.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-400">No image</span>
                                  </div>
                                )}
                                <div 
                                  className="absolute left-4 top-4 px-4 py-1 rounded-full border-2 border-black text-black text-sm font-bold shadow-brutal-xs"
                                  style={{ backgroundColor: getCategoryColor(album.category) }}
                                >
                                  {album.category}
                                </div>
                              </div>
                              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                <div>
                                  <h2 className="text-2xl md:text-3xl font-bold mb-3">{album.title}</h2>
                                  {album.description && (
                                    <p className="text-gray-600 line-clamp-2 mb-4 md:mb-0">{album.description}</p>
                                  )}
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                  <span className="font-medium text-lg">
                                    {album.imageCount} photos
                                  </span>
                                  <motion.div 
                                    className="flex items-center font-bold text-[#f67a45]"
                                    animate={{
                                      x: hoveredAlbum === album.id ? 5 : 0
                                    }}
                                  >
                                    Voir l'album
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {filteredAlbums.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full -z-10"></div>
                  <div className="bg-[#FFD2BF] text-black font-bold px-8 py-4 rounded-full border-3 border-black">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Aucun album trouvé</h3>
                <p className="text-gray-600 mb-8">Essayez une autre catégorie ou revenez plus tard.</p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="relative inline-block group"
                >
                  <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-full transition-transform group-hover:translate-x-3 group-hover:translate-y-3 -z-10"></div>
                  <div className="relative px-6 py-3 bg-[#f67a45] text-white border-2 border-black rounded-full font-medium inline-flex items-center transition-transform group-hover:-translate-y-1">
                    Voir tous les albums
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Style global pour les animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .shadow-brutal-sm {
          box-shadow: 3px 3px 0px 0px rgba(0,0,0,1);
        }
        
        .shadow-brutal-sm-hover {
          box-shadow: 5px 5px 0px 0px rgba(0,0,0,1);
        }
        
        .shadow-brutal-xs {
          box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
        }
      `}</style>
    </main>
  )
} 