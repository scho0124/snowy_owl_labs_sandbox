import { ArrowLeft, MapPin, Grid, List } from 'lucide-react';
import { useState } from 'react';

type Screen = 'kiosk' | 'explore' | 'destination' | 'help' | 'preferences' | 'survey';

interface ExploreProps {
  onNavigate: (screen: Screen, destination?: string) => void;
  onGoBack: () => void;
}

export function Explore({ onNavigate, onGoBack }: ExploreProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="border-b-2 border-black p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onGoBack}
              className="flex items-center gap-2 hover:bg-neutral-100 px-3 py-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm md:text-base">Back</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 border ${viewMode === 'list' ? 'bg-black text-white' : 'border-neutral-400 hover:bg-neutral-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 border ${viewMode === 'grid' ? 'bg-black text-white' : 'border-neutral-400 hover:bg-neutral-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl">Explore</h1>
          <p className="text-sm md:text-base text-neutral-600 mt-1">Browse galleries and exhibitions</p>
        </header>

        {/* Filter Bar */}
        <div className="border-b border-neutral-400 p-4 md:p-6">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-black text-white text-sm">All</button>
            <button className="px-4 py-2 border border-neutral-400 hover:bg-neutral-100 text-sm">Current Floor</button>
            <button className="px-4 py-2 border border-neutral-400 hover:bg-neutral-100 text-sm">Permanent</button>
            <button className="px-4 py-2 border border-neutral-400 hover:bg-neutral-100 text-sm">Temporary</button>
            <button className="px-4 py-2 border border-neutral-400 hover:bg-neutral-100 text-sm">Featured</button>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {viewMode === 'list' ? (
            <div className="space-y-4">
              <ExploreItem
                title="Gallery 2A: Modern Art"
                floor="Floor 2"
                distance="50m away"
                description="Featuring works from 1900-1950 including Cubism, Surrealism, and Abstract Expressionism"
                onNavigate={onNavigate}
              />
              <ExploreItem
                title="Gallery 2B: Contemporary"
                floor="Floor 2"
                distance="75m away"
                description="Current contemporary works and rotating installations from emerging artists"
                onNavigate={onNavigate}
              />
              <ExploreItem
                title="Sculpture Garden"
                floor="Floor 2"
                distance="120m away"
                description="Outdoor and indoor sculptural works spanning multiple periods and styles"
                onNavigate={onNavigate}
              />
              <ExploreItem
                title="Gallery 1A: Classical Art"
                floor="Floor 1"
                distance="One floor down"
                description="Renaissance to Baroque paintings and sculptures from European masters"
                onNavigate={onNavigate}
              />
              <ExploreItem
                title="Gallery 3A: Special Exhibition"
                floor="Floor 3"
                distance="One floor up"
                description="Limited time exhibition: The Art of Light and Shadow (Ends March 15, 2026)"
                onNavigate={onNavigate}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ExploreCard title="Gallery 2A: Modern Art" floor="Floor 2" distance="50m away" onNavigate={onNavigate} />
              <ExploreCard title="Gallery 2B: Contemporary" floor="Floor 2" distance="75m away" onNavigate={onNavigate} />
              <ExploreCard title="Sculpture Garden" floor="Floor 2" distance="120m away" onNavigate={onNavigate} />
              <ExploreCard title="Gallery 1A: Classical Art" floor="Floor 1" distance="One floor down" onNavigate={onNavigate} />
              <ExploreCard title="Gallery 3A: Special Exhibition" floor="Floor 3" distance="One floor up" onNavigate={onNavigate} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ExploreItem({
  title,
  floor,
  distance,
  description,
  onNavigate,
}: {
  title: string;
  floor: string;
  distance: string;
  description: string;
  onNavigate: (screen: Screen, destination?: string) => void;
}) {
  return (
    <div className="border border-neutral-400 p-4 md:p-6 hover:bg-neutral-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl mb-1">{title}</h3>
          <p className="text-sm text-neutral-600">{floor} · {distance}</p>
        </div>
        <MapPin className="w-5 h-5 stroke-[1.5] ml-4" />
      </div>
      <p className="text-sm md:text-base text-neutral-700 mb-4">{description}</p>
      <button
        onClick={() => onNavigate('destination', title)}
        className="w-full border-2 border-black px-4 py-2 hover:bg-black hover:text-white text-sm md:text-base"
      >
        Get Directions
      </button>
    </div>
  );
}

function ExploreCard({
  title,
  floor,
  distance,
  onNavigate,
}: {
  title: string;
  floor: string;
  distance: string;
  onNavigate: (screen: Screen, destination?: string) => void;
}) {
  return (
    <div className="border border-neutral-400 hover:bg-neutral-100">
      <div className="aspect-[4/3] bg-neutral-200 border-b border-neutral-400 flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-neutral-400"></div>
      </div>
      <div className="p-4">
        <h3 className="text-base md:text-lg mb-2">{title}</h3>
        <p className="text-sm text-neutral-600 mb-4">{floor} · {distance}</p>
        <button
          onClick={() => onNavigate('destination', title)}
          className="w-full border border-black px-3 py-2 hover:bg-black hover:text-white text-sm"
        >
          Directions
        </button>
      </div>
    </div>
  );
}