import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ScanLine, Info, Box } from 'lucide-react';
import { menuItems } from './data';
import { MenuItem } from './types';

// Add type declaration for model-viewer to stop TS complaining
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // We are not loading models directly in the list to preserve performance on mobile.
  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center">
      <div className="w-full max-w-md bg-black min-h-screen relative overflow-hidden flex flex-col">
        
        <AnimatePresence mode="wait">
          {!selectedItem ? (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 overflow-y-auto px-5 py-8"
            >
              <header className="mb-8 mt-4 text-center">
                <h1 className="text-2xl font-light tracking-[0.2em] uppercase text-white/90">Premium Menu</h1>
                <div className="w-12 h-0.5 bg-accent mx-auto mt-4 rounded-full"></div>
              </header>

              <div className="flex flex-col gap-4 pb-12">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-card rounded-2xl p-4 flex gap-4 items-center text-left hover:bg-[#252525] transition-colors border border-white/5 shadow-lg active:scale-[0.98]"
                  >
                    <div className="w-20 h-20 bg-[#151515] rounded-xl flex items-center justify-center flex-shrink-0 text-white/20 border border-white/5">
                      <Box className="w-8 h-8 opacity-50" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-semibold text-accent mb-1 truncate">{item.name}</h2>
                      <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-2">
                        {item.description}
                      </p>
                      <p className="text-sm font-bold">{item.price}</p>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-white/20 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0 bg-black flex flex-col z-10"
            >
              <div className="relative flex-1">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 left-5 z-20 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="w-full h-[55vh] bg-gradient-to-b from-[#1a1a1a] to-black relative">
                  {/* We mount model-viewer here, only one at a time, ensuring smooth performance */}
                  <model-viewer
                    src={selectedItem.modelUrl}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    shadow-intensity="1.5"
                    exposure="1"
                    environment-image="neutral"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                  >
                    {/* Native AR button inside model-viewer slotted region */}
                    <button 
                      slot="ar-button" 
                      className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-accent text-black font-semibold px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(255,204,0,0.3)] flex items-center gap-2"
                    >
                      <ScanLine className="w-5 h-5" />
                      View in your space
                    </button>
                  </model-viewer>
                </div>

                <div className="px-6 py-6 border-t border-white/10 rounded-t-3xl -mt-6 bg-black relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
                    <span className="text-xl font-bold text-accent">{selectedItem.price}</span>
                  </div>
                  
                  <div className="mb-8">
                    <p className="text-sm text-white/70 leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <a 
                      href={`/mind-ar-fallback.html?model=${selectedItem.modelUrl}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-colors text-white/80"
                    >
                      <Info className="w-4 h-4" />
                      Camera not turning on? Use Marker AR
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
