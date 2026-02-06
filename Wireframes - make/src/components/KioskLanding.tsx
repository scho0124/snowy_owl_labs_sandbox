import { MapPin, Compass, HelpCircle, X, Menu, Settings, ChevronDown, AlertCircle, Phone, Accessibility, Check } from 'lucide-react';
import { useState } from 'react';

type Screen = 'kiosk' | 'explore' | 'destination' | 'help' | 'preferences' | 'survey' | 'floorMap';

interface KioskLandingProps {
  onNavigate: (screen: Screen, destination?: string, floor?: number) => void;
}

export function KioskLanding({ onNavigate }: KioskLandingProps) {
  const [selectedRoom, setSelectedRoom] = useState<{ name: string; distance: string } | null>(null);
  const [floorsAccordionOpen, setFloorsAccordionOpen] = useState(false);
  const [emergencyAccordionOpen, setEmergencyAccordionOpen] = useState(false);
  const [accessibilityAccordionOpen, setAccessibilityAccordionOpen] = useState(false);
  const [amenitiesAccordionOpen, setAmenitiesAccordionOpen] = useState(false);
  const [surveyModalOpen, setSurveyModalOpen] = useState(false);
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);
  const [visitFrequency, setVisitFrequency] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [avoidStairs, setAvoidStairs] = useState(false);
  const [shortestRoute, setShortestRoute] = useState(true);
  const [textSize, setTextSize] = useState('medium');
  const [language, setLanguage] = useState('english');

  // Room data with distances
  const rooms = [
    { name: 'Gallery 2A', fullName: 'Gallery 2A: Modern Art', distance: '50m away · Same floor' },
    { name: 'Gallery 2B', fullName: 'Gallery 2B: Contemporary', distance: '75m away · Same floor' },
    { name: 'Sculpture Garden', fullName: 'Sculpture Garden', distance: '120m away · Same floor' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile and Tablet Layout */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl mb-1">OAG Wayfinding</h1>
              <p className="text-sm md:text-base text-neutral-600">You are on Floor 2, East Wing</p>
            </div>
            <button
              onClick={() => setPreferencesModalOpen(true)}
              className="p-2 hover:bg-neutral-100"
              aria-label="Navigation settings"
            >
              <Settings className="w-6 h-6 md:w-7 md:h-7" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {/* Map Section */}
          <section className="mb-8 md:mb-12">
            <div className="min-h-[75vh] bg-neutral-200 border-2 border-black relative p-4 md:p-8">
              {/* Gallery 2A: Modern Art */}
              <button 
                onClick={() => setSelectedRoom({ name: 'Gallery 2A: Modern Art', distance: '50m away · Same floor' })}
                className="absolute top-[15%] left-[55%] w-[18%] h-[25%] border-2 border-black bg-white flex flex-col items-center justify-center p-2 hover:bg-neutral-100 cursor-pointer"
              >
                <MapPin className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5] mb-1" />
                <p className="text-[8px] md:text-xs text-center leading-tight">Gallery 2A</p>
              </button>
              
              {/* Gallery 2B: Contemporary */}
              <button 
                onClick={() => setSelectedRoom({ name: 'Gallery 2B: Contemporary', distance: '75m away · Same floor' })}
                className="absolute top-[45%] left-[70%] w-[20%] h-[30%] border-2 border-black bg-white flex flex-col items-center justify-center p-2 hover:bg-neutral-100 cursor-pointer"
              >
                <MapPin className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5] mb-1" />
                <p className="text-[8px] md:text-xs text-center leading-tight">Gallery 2B</p>
              </button>
              
              {/* Sculpture Garden */}
              <button 
                onClick={() => setSelectedRoom({ name: 'Sculpture Garden', distance: '120m away · Same floor' })}
                className="absolute bottom-[10%] left-[15%] w-[25%] h-[35%] border-2 border-black bg-white flex flex-col items-center justify-center p-2 hover:bg-neutral-100 cursor-pointer"
              >
                <MapPin className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5] mb-1" />
                <p className="text-[8px] md:text-xs text-center leading-tight">Sculpture Garden</p>
              </button>
              
              {/* Corridors */}
              <div className="absolute top-[30%] left-[35%] w-[3%] h-[40%] bg-neutral-400"></div>
              <div className="absolute top-[48%] left-[20%] w-[50%] h-[3%] bg-neutral-400"></div>
              
              {/* You Are Here Marker - Circle Avatar */}
              <div className="absolute top-[50%] left-[38%]">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-black border-4 border-white relative">
                  <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-black text-white px-2 py-1 text-[10px] md:text-xs">
                      You Are Here
                    </div>
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black mx-auto"></div>
                  </div>
                </div>
              </div>
              
              {/* Floor Label */}
              <div className="absolute top-2 left-2 bg-white border border-neutral-400 px-2 py-1">
                <p className="text-xs md:text-sm">Floor 2 - East Wing</p>
              </div>
            </div>
          </section>

          {/* Other Floors */}
          <section className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Explore Other Floors</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onNavigate('floorMap', undefined, 1)}
                className="aspect-square border-2 border-black hover:bg-neutral-100 flex items-center justify-center text-2xl md:text-3xl"
              >
                Floor 1
              </button>

              <button 
                onClick={() => onNavigate('floorMap', undefined, 3)}
                className="aspect-square border-2 border-black hover:bg-neutral-100 flex items-center justify-center text-2xl md:text-3xl"
              >
                Floor 3
              </button>

              <button 
                onClick={() => onNavigate('floorMap', undefined, 4)}
                className="aspect-square border-2 border-black hover:bg-neutral-100 flex items-center justify-center text-2xl md:text-3xl"
              >
                Floor 4
              </button>

              <button 
                onClick={() => onNavigate('floorMap', undefined, 5)}
                className="aspect-square border-2 border-black hover:bg-neutral-100 flex items-center justify-center text-2xl md:text-3xl"
              >
                Floor 5
              </button>
            </div>
          </section>

          {/* Emergency & Essential */}
          <section className="mb-8 md:mb-12">
            <button
              onClick={() => setEmergencyAccordionOpen(!emergencyAccordionOpen)}
              className="w-full flex items-center justify-between mb-4 md:mb-6 hover:opacity-70"
            >
              <h2 className="text-xl md:text-2xl">Emergency & Essential</h2>
              <ChevronDown 
                className={`w-6 h-6 transition-transform ${emergencyAccordionOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {emergencyAccordionOpen && (
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('destination', 'Emergency Exit')}
                  className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
                >
                  <AlertCircle className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg mb-1">Emergency Exit</h3>
                    <p className="text-sm text-neutral-600">Nearest emergency exit is 45m east</p>
                  </div>
                  <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Main Exit')}
                  className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
                >
                  <MapPin className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg mb-1">Main Exit</h3>
                    <p className="text-sm text-neutral-600">Floor 1 · One floor down</p>
                  </div>
                  <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Information Desk')}
                  className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
                >
                  <Phone className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg mb-1">Information Desk</h3>
                    <p className="text-sm text-neutral-600">Floor 1, near main entrance</p>
                  </div>
                  <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                </button>
              </div>
            )}
          </section>

          {/* Accessibility */}
          <section className="mb-8 md:mb-12">
            <button
              onClick={() => setAccessibilityAccordionOpen(!accessibilityAccordionOpen)}
              className="w-full flex items-center justify-between mb-4 md:mb-6 hover:opacity-70"
            >
              <h2 className="text-xl md:text-2xl">Accessibility</h2>
              <ChevronDown 
                className={`w-6 h-6 transition-transform ${accessibilityAccordionOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {accessibilityAccordionOpen && (
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('destination', 'Accessible Washroom')}
                  className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
                >
                  <Accessibility className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg mb-1">Accessible Washroom</h3>
                    <p className="text-sm text-neutral-600">Floor 2 · 85m west</p>
                  </div>
                  <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Elevator')}
                  className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
                >
                  <Accessibility className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg mb-1">Elevator</h3>
                    <p className="text-sm text-neutral-600">Floor 2 · 120m west</p>
                  </div>
                  <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Accessible Seating')}
                  className="w-full border border-neutral-400 p-4 hover:bg-neutral-100 flex items-start gap-4"
                >
                  <Accessibility className="w-6 h-6 stroke-[1.5] flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <h3 className="text-base md:text-lg mb-1">Accessible Seating</h3>
                    <p className="text-sm text-neutral-600">Multiple locations · View all</p>
                  </div>
                  <MapPin className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                </button>
              </div>
            )}
          </section>

          {/* Amenities */}
          <section className="mb-8 md:mb-12">
            <button
              onClick={() => setAmenitiesAccordionOpen(!amenitiesAccordionOpen)}
              className="w-full flex items-center justify-between mb-4 md:mb-6 hover:opacity-70"
            >
              <h2 className="text-xl md:text-2xl">Amenities</h2>
              <ChevronDown 
                className={`w-6 h-6 transition-transform ${amenitiesAccordionOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {amenitiesAccordionOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => onNavigate('destination', 'Washrooms')}
                  className="border border-neutral-400 p-4 hover:bg-neutral-100 text-left"
                >
                  <h3 className="text-base md:text-lg mb-1">Washrooms</h3>
                  <p className="text-sm text-neutral-600">Floor 2 · 65m away</p>
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Café')}
                  className="border border-neutral-400 p-4 hover:bg-neutral-100 text-left"
                >
                  <h3 className="text-base md:text-lg mb-1">Café</h3>
                  <p className="text-sm text-neutral-600">Floor 3 · One floor up</p>
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Coat Check')}
                  className="border border-neutral-400 p-4 hover:bg-neutral-100 text-left"
                >
                  <h3 className="text-base md:text-lg mb-1">Coat Check</h3>
                  <p className="text-sm text-neutral-600">Floor 1 · One floor down</p>
                </button>

                <button
                  onClick={() => onNavigate('destination', 'Gift Shop')}
                  className="border border-neutral-400 p-4 hover:bg-neutral-100 text-left"
                >
                  <h3 className="text-base md:text-lg mb-1">Gift Shop</h3>
                  <p className="text-sm text-neutral-600">Floor 1 · One floor down</p>
                </button>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-400 p-4 md:p-6">
          <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
            <button className="hover:text-black">Terms</button>
            <span>|</span>
            <button className="hover:text-black">Privacy</button>
            <span>|</span>
            <button className="hover:text-black">Cookie notice</button>
            <span>|</span>
            <button 
              onClick={() => setSurveyModalOpen(true)}
              className="hover:text-black"
            >
              Survey
            </button>
          </div>
        </footer>
      </div>

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

      {/* Survey Modal */}
      {surveyModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 z-40"
            onClick={() => setSurveyModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white border-2 border-black z-50 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="border-b-2 border-black p-4 md:p-6 flex items-start justify-between flex-shrink-0">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl mb-2">Optional Survey</h2>
                <p className="text-sm md:text-base text-neutral-600">
                  Help us improve your gallery experience. This survey is completely optional.
                </p>
              </div>
              <button
                onClick={() => setSurveyModalOpen(false)}
                className="flex-shrink-0 p-2 hover:bg-neutral-100 ml-4"
                aria-label="Close survey"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Opt-out Message */}
              <div className="bg-neutral-100 border border-neutral-400 p-4 md:p-6 mb-8">
                <p className="text-sm md:text-base text-neutral-700">
                  Your responses are anonymous and will only be used to improve our services. 
                  You can skip this survey or close it at any time.
                </p>
              </div>

              {/* Survey Questions */}
              <div className="space-y-8">
                {/* Question 1 */}
                <div>
                  <label className="text-lg md:text-xl mb-4 block">
                    How often do you visit art galleries?
                  </label>
                  <div className="space-y-2">
                    <SurveyOption
                      label="First time"
                      checked={visitFrequency === 'first'}
                      onChange={() => setVisitFrequency('first')}
                    />
                    <SurveyOption
                      label="Once or twice a year"
                      checked={visitFrequency === 'yearly'}
                      onChange={() => setVisitFrequency('yearly')}
                    />
                    <SurveyOption
                      label="Several times a year"
                      checked={visitFrequency === 'several'}
                      onChange={() => setVisitFrequency('several')}
                    />
                    <SurveyOption
                      label="Monthly or more"
                      checked={visitFrequency === 'monthly'}
                      onChange={() => setVisitFrequency('monthly')}
                    />
                    <SurveyOption
                      label="Prefer not to say"
                      checked={visitFrequency === 'no-answer'}
                      onChange={() => setVisitFrequency('no-answer')}
                    />
                  </div>
                </div>

                {/* Question 2 */}
                <div>
                  <label className="text-lg md:text-xl mb-4 block">
                    Age group (optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <AgeButton
                      label="Under 18"
                      selected={ageGroup === 'under18'}
                      onClick={() => setAgeGroup('under18')}
                    />
                    <AgeButton
                      label="18-24"
                      selected={ageGroup === '18-24'}
                      onClick={() => setAgeGroup('18-24')}
                    />
                    <AgeButton
                      label="25-34"
                      selected={ageGroup === '25-34'}
                      onClick={() => setAgeGroup('25-34')}
                    />
                    <AgeButton
                      label="35-44"
                      selected={ageGroup === '35-44'}
                      onClick={() => setAgeGroup('35-44')}
                    />
                    <AgeButton
                      label="45-64"
                      selected={ageGroup === '45-64'}
                      onClick={() => setAgeGroup('45-64')}
                    />
                    <AgeButton
                      label="65+"
                      selected={ageGroup === '65+'}
                      onClick={() => setAgeGroup('65+')}
                    />
                  </div>
                </div>

                {/* Question 3 */}
                <div>
                  <label className="text-lg md:text-xl mb-4 block">
                    What brings you to the gallery today? (optional)
                  </label>
                  <textarea
                    placeholder="Your answer..."
                    className="w-full border-2 border-neutral-400 p-3 md:p-4 min-h-[120px] text-base resize-y focus:border-black"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-neutral-400 p-4 md:p-6 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSurveyModalOpen(false)}
                  className="flex-1 bg-black text-white px-6 py-4 text-base md:text-lg hover:bg-neutral-800"
                >
                  Submit Survey
                </button>
                <button
                  onClick={() => setSurveyModalOpen(false)}
                  className="flex-1 border-2 border-neutral-400 px-6 py-4 text-base md:text-lg hover:bg-neutral-100"
                >
                  Skip Survey
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Preferences Modal */}
      {preferencesModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] bg-opacity-50 z-40"
            onClick={() => setPreferencesModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-white border-2 border-black z-50 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="border-b-2 border-black p-4 md:p-6 flex items-start justify-between flex-shrink-0">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl mb-2">Navigation Preferences</h2>
                <p className="text-sm md:text-base text-neutral-600">
                  Customize your navigation experience.
                </p>
              </div>
              <button
                onClick={() => setPreferencesModalOpen(false)}
                className="flex-shrink-0 p-2 hover:bg-neutral-100 ml-4"
                aria-label="Close preferences"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Route Preferences */}
              <section className="mb-8 md:mb-12">
                <h2 className="text-xl md:text-2xl mb-4">Route Preferences</h2>
                
                <div className="space-y-4">
                  <PreferenceToggle
                    label="Avoid stairs"
                    description="Route will use elevators and ramps only"
                    checked={avoidStairs}
                    onChange={setAvoidStairs}
                  />
                  
                  <PreferenceToggle
                    label="Shortest route"
                    description="Prioritize distance over accessibility features"
                    checked={shortestRoute}
                    onChange={setShortestRoute}
                  />
                </div>
              </section>

              {/* Display Preferences */}
              <section className="mb-8 md:mb-12">
                <h2 className="text-xl md:text-2xl mb-4">Display Preferences</h2>
                
                <div className="mb-6">
                  <label className="text-base md:text-lg mb-3 block">Language</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setLanguage('english')}
                      className={`border p-3 ${
                        language === 'english'
                          ? 'border-2 border-black bg-neutral-100'
                          : 'border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLanguage('french')}
                      className={`border p-3 ${
                        language === 'french'
                          ? 'border-2 border-black bg-neutral-100'
                          : 'border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      Français
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-base md:text-lg mb-3 block">Text Size</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setTextSize('small')}
                      className={`border p-3 ${
                        textSize === 'small'
                          ? 'border-2 border-black bg-neutral-100'
                          : 'border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      Small
                    </button>
                    <button
                      onClick={() => setTextSize('medium')}
                      className={`border p-3 ${
                        textSize === 'medium'
                          ? 'border-2 border-black bg-neutral-100'
                          : 'border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setTextSize('large')}
                      className={`border p-3 ${
                        textSize === 'large'
                          ? 'border-2 border-black bg-neutral-100'
                          : 'border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      Large
                    </button>
                  </div>
                </div>
              </section>

              {/* Accessibility Information */}
              <section className="mb-8">
                <div className="border border-neutral-400 p-4 md:p-6 bg-neutral-50">
                  <h3 className="text-lg md:text-xl mb-3">Accessibility Information</h3>
                  <ul className="space-y-2 text-sm md:text-base text-neutral-700">
                    <li>• All floors are connected by elevators</li>
                    <li>• Accessible washrooms available on each floor</li>
                    <li>• Audio descriptions available for select exhibitions</li>
                    <li>• Wheelchairs available at information desk</li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-neutral-400 p-4 md:p-6 flex-shrink-0">
              <button
                onClick={() => setPreferencesModalOpen(false)}
                className="w-full bg-black text-white px-6 py-4 text-base md:text-lg hover:bg-neutral-800"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SurveyOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-full border p-3 md:p-4 text-left flex items-center gap-3 ${
        checked
          ? 'border-2 border-black bg-neutral-100'
          : 'border-neutral-400 hover:bg-neutral-50'
      }`}
    >
      <div
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 ${
          checked ? 'border-black' : 'border-neutral-400'
        }`}
      >
        {checked && (
          <div className="w-full h-full rounded-full bg-black scale-[0.6]"></div>
        )}
      </div>
      <span className="text-base md:text-lg">{label}</span>
    </button>
  );
}

function AgeButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border p-3 md:p-4 text-sm md:text-base ${
        selected
          ? 'border-2 border-black bg-neutral-100'
          : 'border-neutral-400 hover:bg-neutral-50'
      }`}
    >
      {label}
    </button>
  );
}

function PreferenceToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full border border-neutral-400 p-4 hover:bg-neutral-50 flex items-start gap-4"
    >
      <div
        className={`flex-shrink-0 w-6 h-6 border-2 flex items-center justify-center ${
          checked ? 'border-black bg-black' : 'border-neutral-400'
        }`}
      >
        {checked && <Check className="w-4 h-4 text-white stroke-[3]" />}
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-base md:text-lg mb-1">{label}</h3>
        <p className="text-sm text-neutral-600">{description}</p>
      </div>
    </button>
  );
}