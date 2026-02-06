import { ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';

interface FloorMapProps {
  floor: number;
  onGoBack: () => void;
  onNavigate: (screen: string, destination?: string) => void;
}

export function FloorMap({ floor, onGoBack, onNavigate }: FloorMapProps) {
  const [selectedRoom, setSelectedRoom] = useState<{ name: string; distance: string } | null>(null);

  // Define floor-specific content
  const getFloorContent = () => {
    switch (floor) {
      case 1:
        return {
          title: 'Floor 1',
          subtitle: 'Classical Art, Main Entrance',
          rooms: [
            { name: 'Gallery 1A', top: '20%', left: '25%', width: '22%', height: '28%', distance: '120m away · Floor 1' },
            { name: 'Gallery 1B', top: '55%', left: '60%', width: '25%', height: '30%', distance: '140m away · Floor 1' },
            { name: 'Main Entrance', top: '15%', left: '65%', width: '20%', height: '20%', distance: '100m away · Floor 1' },
          ],
        };
      case 3:
        return {
          title: 'Floor 3',
          subtitle: 'Special Exhibitions, Rooftop Café',
          rooms: [
            { name: 'Special Exhibition', top: '25%', left: '15%', width: '30%', height: '40%', distance: '150m away · Floor 3' },
            { name: 'Gallery 3A', top: '35%', left: '60%', width: '25%', height: '25%', distance: '130m away · Floor 3' },
            { name: 'Rooftop Café', top: '70%', left: '40%', width: '35%', height: '20%', distance: '160m away · Floor 3' },
          ],
        };
      default:
        return {
          title: 'Floor 2',
          subtitle: 'Modern Art, Contemporary',
          rooms: [
            { name: 'Gallery 2A', top: '15%', left: '55%', width: '18%', height: '25%', distance: '50m away · Same floor' },
            { name: 'Gallery 2B', top: '45%', left: '70%', width: '20%', height: '30%', distance: '75m away · Same floor' },
            { name: 'Sculpture Garden', top: '55%', left: '15%', width: '25%', height: '35%', distance: '120m away · Same floor' },
          ],
        };
    }
  };

  const floorContent = getFloorContent();

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header with Back Button */}
      <header className="border-b-2 border-black p-4 md:p-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onGoBack}
            className="p-2 border-2 border-black hover:bg-neutral-100"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl mb-1">{floorContent.title}</h1>
            <p className="text-sm md:text-base text-neutral-600">{floorContent.subtitle}</p>
          </div>
        </div>
      </header>

      {/* Full Screen Map */}
      <main className="flex-1 p-4 md:p-6">
        <div className="h-full">
          <div className="h-full bg-neutral-200 border-2 border-black relative p-4 md:p-8">
            {/* Render all rooms for this floor */}
            {floorContent.rooms.map((room, index) => (
              <button
                key={index}
                onClick={() => setSelectedRoom({ name: room.name, distance: room.distance })}
                className="absolute border-2 border-black bg-white flex flex-col items-center justify-center p-2 hover:bg-neutral-100 cursor-pointer"
                style={{
                  top: room.top,
                  left: room.left,
                  width: room.width,
                  height: room.height,
                }}
              >
                <MapPin className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5] mb-1" />
                <p className="text-[8px] md:text-xs text-center leading-tight">{room.name}</p>
              </button>
            ))}

            {/* Corridors */}
            <div className="absolute top-[30%] left-[35%] w-[3%] h-[40%] bg-neutral-400"></div>
            <div className="absolute top-[48%] left-[20%] w-[50%] h-[3%] bg-neutral-400"></div>

            {/* Floor Label */}
            <div className="absolute top-2 left-2 bg-white border border-neutral-400 px-2 py-1">
              <p className="text-xs md:text-sm">{floorContent.title}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Room Selection Overlay */}
      {selectedRoom && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 z-40"
            onClick={() => setSelectedRoom(null)}
          />
          
          {/* Overlay Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-black p-6 md:p-8 z-50 w-[90%] max-w-md">
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl mb-2">{selectedRoom.name}</h3>
                <p className="text-sm md:text-base text-neutral-600">{selectedRoom.distance}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                onNavigate('destination', selectedRoom.name);
                setSelectedRoom(null);
              }}
              className="w-full border-2 border-black p-4 hover:bg-neutral-100 text-base md:text-lg"
            >
              Navigate Here
            </button>
          </div>
        </>
      )}
    </div>
  );
}