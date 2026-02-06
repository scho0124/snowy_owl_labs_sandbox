import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

type Screen = 'kiosk' | 'explore' | 'destination' | 'help' | 'preferences' | 'survey';

interface NavigationPreferencesProps {
  onNavigate: (screen: Screen) => void;
  onGoBack: () => void;
}

export function NavigationPreferences({ onNavigate, onGoBack }: NavigationPreferencesProps) {
  const [avoidStairs, setAvoidStairs] = useState(false);
  const [shortestRoute, setShortestRoute] = useState(true);
  const [textSize, setTextSize] = useState('medium');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="border-b-2 border-black p-4 md:p-6">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 hover:bg-neutral-100 px-3 py-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm md:text-base">Back</span>
          </button>
          <h1 className="text-2xl md:text-3xl">Navigation Preferences</h1>
          <p className="text-sm md:text-base text-neutral-600 mt-1">Customize your navigation experience</p>
        </header>

        <main className="p-4 md:p-6">
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

          {/* Save Button */}
          <section>
            <button
              onClick={onGoBack}
              className="w-full bg-black text-white px-6 py-4 text-base md:text-lg hover:bg-neutral-800"
            >
              Save Preferences
            </button>
          </section>
        </main>
      </div>
    </div>
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
  onChange: (checked: boolean) => void;
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