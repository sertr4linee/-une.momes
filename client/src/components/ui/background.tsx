export default function GradientBackground() {
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(to bottom, #f8d7e6 0%, #f4a990 50%, #e67e56 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
            }}
          />
          
          {/* Dot pattern overlay */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1.5px, transparent 1.5px)`,
              backgroundSize: '25px 25px',
              backgroundPosition: '0 0',
              opacity: 0.4,
            }}
          />
        </div>
  
        {/* White flowers/stars with black outline and CSS animations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top left flower */}
          <div className="absolute -left-12 -top-12" style={{ width: "150px", height: "150px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] animate-[spin_8s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(340deg) saturate(1.2)",
                opacity: 0.9
              }}
            />
          </div>
  
          {/* Top right small flower */}
          <div className="absolute -right-2 -top-1" style={{ width: "220px", height: "180px" }}>
            <img
              src="icon.svg"
              alt=""
              className="w-full h-full animate-[bounce_4s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(355deg) saturate(1.4)",
                opacity: 0.85
              }}
            />
          </div>
  
          {/* Center top flower */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4" style={{ width: "120px", height: "120px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-pulse"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
                animationDuration: "4s"
              }}
            />
          </div>
  
          {/* Bottom left flower */}
          <div className="absolute -left-8 -bottom-8" style={{ width: "120px", height: "120px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-[spin_10s_linear_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(15deg) saturate(1.3)",
                opacity: 0.9
              }}
            />
          </div>
  
          {/* Bottom center flower */}
          <div className="absolute left-1/4 -bottom-6" style={{ width: "90px", height: "90px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-bounce"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(340deg) saturate(1.1)",
                opacity: 0.85,
                animationDuration: "5s"
              }}
            />
          </div>
  
          {/* Bottom right medium flower */}
          <div className="absolute right-24 -bottom-5" style={{ width: "100px", height: "100px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-[ping_10s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(5deg) saturate(1.4)",
                opacity: 0.9
              }}
            />
          </div>
  
          {/* Bottom right corner flower */}
          <div className="absolute -right-12 -bottom-12" style={{ width: "150px", height: "150px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-pulse"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9))",
                animationDuration: "6s"
              }}
            />
          </div>
  
          {/* Large flower on right side extremity */}
          <div className="absolute right-0 top-1/3" style={{ width: "180px", height: "180px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-[spin_15s_linear_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(345deg) saturate(1.2)",
                opacity: 0.85
              }}
            />
          </div>
  
          <div className="absolute -left-4 top-1/2" style={{ width: "110px", height: "110px" }}>
            <img
              src="stars.svg"
              alt=""
              className="w-full h-full animate-[float_7s_ease-in-out_infinite]"
              style={{ 
                filter: "drop-shadow(0px 0px 1px rgba(0,0,0,0.9)) hue-rotate(10deg) saturate(1.3)",
                opacity: 0.9
              }}
            />
          </div>
        </div>
      </div>
    )
  }
  
  