"use client"

import GradientBackground from "@/components/ui/background"
import Link from "next/link";
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion";
import * as jose from 'jose';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Fonction pour simuler une connexion avec un token temporaire
  const simulateLogin = () => {
    // Créer un token JWT simple (pour débogage uniquement)
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 7); // Expiration dans 7 jours
    
    document.cookie = `token=debug-token; path=/; expires=${expireDate.toUTCString()}`;
    setIsAuthenticated(true);
    alert('Token de test créé! Rechargez la page pour voir le bouton Admin');
  };

  // Vérifier si l'utilisateur est authentifié
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Récupérer le token depuis les cookies
        const cookies = document.cookie.split(';').reduce((acc, cookie) => {
          const [key, value] = cookie.trim().split('=');
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        
        const token = cookies.token;
        console.log("Token trouvé:", token ? "Oui" : "Non");
        
        if (token) {
          // Vérifier si le token est valide (non expiré)
          try {
            const { payload } = jose.decodeJwt(token);
            console.log("Payload JWT:", payload);
            if (payload && 
                typeof payload === 'object' && 
                'exp' in payload && 
                typeof payload.exp === 'number' && 
                payload.exp * 1000 > Date.now()) {
              setIsAuthenticated(true);
              console.log("Authentification réussie!");
            } else {
              console.log("Token expiré ou invalide");
            }
          } catch (e) {
            console.error('Token invalide:', e);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <GradientBackground />
      
      {/* Bouton de test pour la connexion (à supprimer en production) */}
      <button
        onClick={simulateLogin}
        className="fixed bottom-4 right-4 bg-black text-white px-3 py-1.5 rounded z-50 text-sm"
      >
        Simuler connexion
      </button>
      
      {/* Étoile décorative */}
      <div
        className="fixed z-10 bottom-[10%] left-[8%] w-[40px] h-[40px] md:w-[100px] md:h-[100px] animate-bounce hidden sm:block"
        style={{ animationDuration: "6s" }}
      >
        <Image
          src="/stars.svg"
          alt="Étoile décorative"
          width={100}
          height={100}
          className="w-full h-full"
          style={{ filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))" }}
        />
      </div>
      
      {/* Contenu du portfolio avec design néobrutalist */}
      <div className="relative z-30 flex items-center justify-center min-h-screen py-2 pb-10 sm:py-6 md:py-8 lg:py-12 px-2 sm:px-4">
        <div className="relative w-[99%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[3px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto">
          {/* Éléments des coins - Design en L - tailles responsives */}
          <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
            <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
            <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
          </div>
          
          {/* Coin supérieur droit */}
          <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          
          {/* Coin inférieur gauche */}
          <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          
          {/* Coin inférieur droit */}
          <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
            <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
            <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
          </div>
          
          {/* Conteneur avec meilleur padding responsive */}
          <div className="p-3 pt-5 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center md:block">
            {/* Navigation - mise en page mobile améliorée */}
            <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 w-full">
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
                {/* Bouton Admin si authentifié */}
                {isAuthenticated ? (
                  <Link href="/admin/dashboard" className="relative inline-block">
                    <div className="absolute top-[2px] left-[2px] w-full h-full bg-black rounded-md"></div>
                    <button className="relative bg-[#f67a45] text-white px-3 py-1.5 rounded-md flex items-center justify-center text-sm font-medium">
                      Admin
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <div className="text-sm text-gray-400">
                    Non connecté
                  </div>
                )}
              </div>

              {/* Bouton menu mobile - meilleur positionnement */}
              <button 
                className="sm:hidden fixed top-4 right-4 p-2 z-50 bg-white/80 backdrop-blur-sm rounded-md border-2 border-black"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Liens de navigation - menu mobile amélioré */}
              <div className={`
                ${menuOpen ? 'flex fixed inset-0 bg-white/95 z-40' : 'hidden'} 
                sm:flex sm:relative sm:bg-transparent
                flex-col sm:flex-row 
                items-center justify-center sm:justify-start
                space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8
                text-lg sm:text-base md:text-lg
                w-full sm:w-auto
              `}>
                <a href="/about" className="hover:underline">À propos</a>
                <a href="/work" className="hover:underline">Travaux</a>
                <a href="/services" className="hover:underline">Services</a>
                <a href="/contact" className="hover:underline">Contact</a>
                
                {/* Lien Admin si authentifié - visible seulement sur mobile */}
                {isAuthenticated && (
                  <Link href="/admin/dashboard" className="sm:hidden">
                    <div className="flex items-center text-[#f67a45] font-medium">
                      Admin
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    </div>
                  </Link>
                )}
                
                {/* Bouton CV - taille responsive */}
                <div className="relative inline-block mt-4 sm:mt-0">
                  <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
                  <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                    CV 
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
            
            {/* Grille de contenu principal - mise en page responsive améliorée */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
              {/* Illustration du personnage - taille responsive */}
              <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2 mb-4 md:mb-0 pt-2">
                <div className="w-[45%] sm:w-[35%] md:w-[75%] lg:w-[80%] max-w-[280px]">
                  <Image
                    src="/maskote.svg"
                    alt="Illustration du personnage"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
              
              <div className="md:col-span-7 order-2 md:order-1 text-left flex flex-col items-start">
                <div className="relative w-full max-w-[500px] px-4">
                  {/* Bulle "Bonjour je suis" - positionnement et taille responsive */}
                  <div className="absolute -top-8 sm:-top-10 left-2 md:left-2 transform md:translate-x-0">
                    <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                    👋 Heyy, je suis
                    </div>
                  </div>

                  {/* Nom avec typographie responsive */}
                  <h1 className="text-[40px] sm:text-[40px] md:text-[50px] lg:text-[70px] xl:text-[80px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash mt-2 md:mt-0">
                    Maelle <br />
                    <div className="flex items-center justify-start">
                      Crescence
                      <Image 
                        src="/effect.svg" 
                        width={120}
                        height={90}
                        alt="Effet d'illustration" 
                        className="sm:w-[140px] md:w-[160px] lg:w-[170px] sm:h-[100px] md:h-[110px] lg:h-[120px] ml-3 sm:ml-4 opacity-20"
                      />
                    </div>
                  </h1>
                </div>
                
                {/* Description - texte responsive */}
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4 sm:mt-6 font-normal text-[#3C3C3C] max-w-md mx-0 leading-tight px-4 md:px-0">
                  Je <span className="text-[#f67a45] font-medium">griffonne</span> sur papier et aide les marques à créer des designs.
                </p>
                
                {/* Boutons - taille et espacement responsifs */}
                <div className="flex flex-col sm:flex-row items-center self-center sm:self-start sm:items-start justify-center sm:justify-start sm:space-x-3 md:space-x-4 space-y-3 sm:space-y-0 mt-5 sm:mt-8 md:mt-10 w-full max-w-md pb-3 sm:pb-0">
                  <Link href="/work" className="w-[80%] sm:w-auto">
                  <button className="bg-[#2D2D2D] text-white border-2 border-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-full sm:w-auto">
                    Engagez-moi
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  </Link>
                  <Link href="/about" className="w-[80%] sm:w-auto">
                  <button className="bg-white border-2 border-black px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-semibold flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-full sm:w-auto">
                    Mon Histoire
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bannière du bas - taille et positionnement responsifs */}
          <div 
            className={`absolute -bottom-[25px] sm:-bottom-[20px] md:-bottom-[25px] left-1/2 -translate-x-1/2 flex items-center justify-center z-40 w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] h-[36px] sm:h-[45px] md:h-[55px] lg:h-[65px] ${menuOpen ? 'hidden sm:flex' : 'flex'}`}
            style={{
              transform: "rotate(4.65deg)",
              backgroundColor: "#FFD2BF",
              borderRadius: "40px",
              border: "2px solid black",
              boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
              padding: "0 8px",
            }}
          >
            <span 
              className="text-[14px] sm:text-[18px] md:text-[22px] lg:text-[28px] font-black text-black text-center truncate"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              @ une_mome
            </span>
            
            <motion.div 
            className="absolute -right-4 sm:-right-4 md:-right-5 lg:-right-6 -top-1 w-[45px] sm:w-[65px] md:w-[85px] lg:w-[100px] h-[35px] sm:h-[50px] md:h-[65px] lg:h-[80px]"
            animate={{
              rotate: [-5, 5, -5],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
          >
            <Image 
              src="/mouse.svg" 
              alt="Curseur de souris" 
              width={100}
              height={80}
              className="w-full h-full" 
            />
          </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}