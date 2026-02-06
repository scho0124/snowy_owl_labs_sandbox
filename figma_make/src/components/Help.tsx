import { ArrowLeft, MapPin, Accessibility, Phone, AlertCircle } from 'lucide-react';

type Screen = 'kiosk' | 'explore' | 'destination' | 'help' | 'preferences' | 'survey';

interface HelpProps {
  onNavigate: (screen: Screen, destination?: string) => void;
  onGoBack: () => void;
}

export function Help({ onNavigate, onGoBack }: HelpProps) {
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
          <h1 className="text-2xl md:text-3xl">Help & Information</h1>
          <p className="text-sm md:text-base text-neutral-600 mt-1">Find essential locations and accessibility options</p>
        </header>

        <main className="p-4 md:p-6">
          {/* Emergency & Essential */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl mb-4">Emergency & Essential</h2>
            <div className="space-y-3">
              <HelpItem
                icon={<AlertCircle className="w-6 h-6 stroke-[1.5]" />}
                title="Emergency Exit"
                description="Nearest emergency exit is 45m east"
                onNavigate={() => onNavigate('destination', 'Emergency Exit')}
              />
              <HelpItem
                icon={<MapPin className="w-6 h-6 stroke-[1.5]" />}
                title="Main Exit"
                description="Floor 1 · One floor down"
                onNavigate={() => onNavigate('destination', 'Main Exit')}
              />
              <HelpItem
                icon={<Phone className="w-6 h-6 stroke-[1.5]" />}
                title="Information Desk"
                description="Floor 1, near main entrance"
                onNavigate={() => onNavigate('destination', 'Information Desk')}
              />
            </div>
          </section>

          {/* Accessibility */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl mb-4">Accessibility</h2>
            <div className="space-y-3">
              <HelpItem
                icon={<Accessibility className="w-6 h-6 stroke-[1.5]" />}
                title="Accessible Washroom"
                description="Floor 2 · 85m west"
                onNavigate={() => onNavigate('destination', 'Accessible Washroom')}
              />
              <HelpItem
                icon={<Accessibility className="w-6 h-6 stroke-[1.5]" />}
                title="Elevator"
                description="Floor 2 · 120m west"
                onNavigate={() => onNavigate('destination', 'Elevator')}
              />
              <HelpItem
                icon={<Accessibility className="w-6 h-6 stroke-[1.5]" />}
                title="Accessible Seating"
                description="Multiple locations · View all"
                onNavigate={() => onNavigate('destination', 'Accessible Seating')}
              />
            </div>
          </section>

          {/* Amenities */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl mb-4">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AmenityButton
                title="Washrooms"
                subtitle="Floor 2 · 65m away"
                onNavigate={() => onNavigate('destination', 'Washrooms')}
              />
              <AmenityButton
                title="Café"
                subtitle="Floor 3 · One floor up"
                onNavigate={() => onNavigate('destination', 'Café')}
              />
              <AmenityButton
                title="Coat Check"
                subtitle="Floor 1 · One floor down"
                onNavigate={() => onNavigate('destination', 'Coat Check')}
              />
              <AmenityButton
                title="Gift Shop"
                subtitle="Floor 1 · One floor down"
                onNavigate={() => onNavigate('destination', 'Gift Shop')}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function HelpItem({
  icon,
  title,
  description,
  onNavigate,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onNavigate: () => void;
}) {
  return (
    <button
      onClick={onNavigate}
      className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 text-left">
        <h3 className="text-base md:text-lg mb-1">{title}</h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
      <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
    </button>
  );
}

function AmenityButton({
  title,
  subtitle,
  onNavigate,
}: {
  title: string;
  subtitle: string;
  onNavigate: () => void;
}) {
  return (
    <button
      onClick={onNavigate}
      className="border border-neutral-400 p-4 hover:bg-neutral-100 text-left"
    >
      <h3 className="text-base md:text-lg mb-1">{title}</h3>
      <p className="text-sm text-neutral-600">{subtitle}</p>
    </button>
  );
}