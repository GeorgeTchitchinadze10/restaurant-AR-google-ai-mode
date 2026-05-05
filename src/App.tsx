import { ScanLine, Info } from 'lucide-react';
import { menuItems } from './data';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-5 font-sans flex flex-col items-center">
      <h1 className="font-light tracking-[2px] uppercase mb-[30px] text-center mt-4">Choose Item</h1>
      
      <div className="w-full max-w-[450px] flex flex-col gap-5 pb-10">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-[#2a2a2a] rounded-[20px] p-[15px] flex gap-[15px] items-center shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
            <div className="w-[120px] h-[120px] bg-white rounded-[15px] flex-shrink-0 relative overflow-hidden">
                <model-viewer
                  src={item.modelUrl}
                  ar
                  ar-modes="webxr scene-viewer quick-look"
                  camera-controls
                  auto-rotate
                  shadow-intensity="1"
                  style={{ width: '100%', height: '100%', backgroundColor: '#ffffff' }}
                >
                  <button 
                    slot="ar-button" 
                    className="absolute top-2 right-2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded border-none shadow-[0_2px_4px_rgba(0,0,0,0.2)] block z-10 cursor-pointer"
                  >
                    VIEW IN AR
                  </button>
                </model-viewer>
            </div>
            
            <div className="flex-1 min-w-0">
                <p className="text-[1.1rem] font-semibold m-0 mb-[5px] text-[#ffcc00] truncate">{item.name}</p>
                <p className="text-[0.85rem] text-[#b0b0b0] m-0 mb-[10px] leading-[1.3] line-clamp-3 text-ellipsis">
                  {item.description}
                </p>
                <p className="text-[1rem] font-bold m-0">{item.price}</p>
                
                <a 
                  href={`/mind-ar-fallback.html?model=${item.modelUrl}`}
                  className="inline-flex mt-3 items-center gap-1.5 text-[11px] text-white/50 hover:text-white/80 transition-colors uppercase tracking-wider bg-black/20 px-2 py-1 rounded"
                >
                  <Info className="w-3.5 h-3.5" />
                  Camera not working? Try Marker AR
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

