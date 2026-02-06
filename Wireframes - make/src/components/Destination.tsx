import { ArrowLeft, Navigation, ChevronRight } from 'lucide-react';

type Screen = 'kiosk' | 'explore' | 'destination' | 'help' | 'preferences' | 'survey';

interface DestinationProps {
  onNavigate: (screen: Screen, destination?: string) => void;
  onGoBack: () => void;
  destination: string | null;
}

export function Destination({ onNavigate, onGoBack, destination }: DestinationProps) {
  const showRoute = destination !== null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="border-b-2 border-black p-4 md:p-6">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 hover:bg-neutral-100 px-3 py-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm md:text-base">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl">
            {showRoute ? 'Navigate to Destination' : 'Choose Destination'}
          </h1>
          {showRoute && (
            <p className="text-sm md:text-base text-neutral-600 mt-1">
              Follow the directions below to reach your destination
            </p>
          )}
        </header>

        <main className="p-4 md:p-6">
          {!showRoute ? (
            <>
              {/* Search/Select Destination */}
              <section className="mb-8">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search for a gallery, exhibition, or amenity"
                    className="w-full border-2 border-black px-4 py-3 text-base md:text-lg"
                  />
                </div>
              </section>

              {/* Quick Access Categories */}
              <section className="mb-8">
                <h2 className="text-xl md:text-2xl mb-4">Categories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="border border-neutral-400 p-4 hover:bg-neutral-100 text-sm md:text-base">
                    Galleries
                  </button>
                  <button className="border border-neutral-400 p-4 hover:bg-neutral-100 text-sm md:text-base">
                    Exhibitions
                  </button>
                  <button className="border border-neutral-400 p-4 hover:bg-neutral-100 text-sm md:text-base">
                    Amenities
                  </button>
                  <button className="border border-neutral-400 p-4 hover:bg-neutral-100 text-sm md:text-base">
                    Exits
                  </button>
                </div>
              </section>

              {/* Popular Destinations */}
              <section>
                <h2 className="text-xl md:text-2xl mb-4">Popular Destinations</h2>
                <div className="space-y-3">
                  <DestinationButton
                    title="Gallery 2A: Modern Art"
                    subtitle="Floor 2 · 50m away"
                    onClick={() => onNavigate('destination', 'Gallery 2A: Modern Art')}
                  />
                  <DestinationButton
                    title="Rooftop Café"
                    subtitle="Floor 3 · One floor up"
                    onClick={() => onNavigate('destination', 'Rooftop Café')}
                  />
                  <DestinationButton
                    title="Main Entrance"
                    subtitle="Floor 1 · One floor down"
                    onClick={() => onNavigate('destination', 'Main Entrance')}
                  />
                  <DestinationButton
                    title="Accessible Washroom"
                    subtitle="Floor 2 · 85m away"
                    onClick={() => onNavigate('destination', 'Accessible Washroom')}
                  />
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Map Placeholder */}
              <section className="mb-8">
                <div className="min-h-[75vh] bg-neutral-200 border-2 border-black relative p-4 md:p-8">
                  {/* Route Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <line
                      x1="20%" y1="50%"
                      x2="70%" y2="30%"
                      stroke="black"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                    />
                  </svg>
                  
                  {/* Starting Point - You Are Here */}
                  <div className="absolute top-[50%] left-[20%] transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 2 }}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-4 border-white relative">
                      <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-black text-white px-2 py-1 text-[10px] md:text-xs">
                          You Are Here
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black mx-auto"></div>
                      </div>
                    </div>
                  </div>

                  {/* Destination Point */}
                  <div className="absolute top-[30%] left-[70%] transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 2 }}>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border-4 border-black relative flex items-center justify-center">
                      <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-black"></div>
                      <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <div className="bg-white border-2 border-black px-2 py-1 text-[10px] md:text-xs">
                          {destination}
                        </div>
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black mx-auto"></div>
                      </div>
                    </div>
                  </div>

                  {/* Corridors for context */}
                  <div className="absolute top-[30%] left-[25%] w-[3%] h-[30%] bg-neutral-400"></div>
                  <div className="absolute top-[48%] left-[20%] w-[55%] h-[3%] bg-neutral-400"></div>
                  
                  {/* Floor Label */}
                  <div className="absolute top-2 left-2 bg-white border border-neutral-400 px-2 py-1">
                    <p className="text-xs md:text-sm">Floor 2 - East Wing</p>
                  </div>
                  
                  {/* Distance Info */}
                  <div className="absolute bottom-2 right-2 bg-black text-white px-3 py-2">
                    <p className="text-xs md:text-sm">~50m · 2 min walk</p>
                  </div>
                </div>
              </section>

              {/* Step-by-Step Directions */}
              <section>
                <h2 className="text-xl md:text-2xl mb-4">Directions</h2>
                <div className="space-y-2">
                  <DirectionStep number={1} instruction="Head east down the main corridor" distance="30m" />
                  <DirectionStep number={2} instruction="Turn right at the sculpture installation" distance="15m" />
                  <DirectionStep number={3} instruction="Gallery entrance on your left" distance="5m" />
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function DestinationButton({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 text-left flex items-center justify-between"
    >
      <div>
        <h3 className="text-base md:text-lg mb-1">{title}</h3>
        <p className="text-sm text-neutral-600">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 stroke-[1.5]" />
    </button>
  );
}

function DirectionStep({
  number,
  instruction,
  distance,
}: {
  number: number;
  instruction: string;
  distance: string;
}) {
  return (
    <div className="flex gap-4 p-4 border border-neutral-400">
      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border-2 border-black flex items-center justify-center">
        <span className="text-base md:text-lg">{number}</span>
      </div>
      <div className="flex-1">
        <p className="text-base md:text-lg mb-1">{instruction}</p>
        <p className="text-sm text-neutral-600">{distance}</p>
      </div>
    </div>
  );
}