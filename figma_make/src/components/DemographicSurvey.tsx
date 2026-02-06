import { X } from 'lucide-react';
import { useState } from 'react';

type Screen = 'kiosk' | 'explore' | 'destination' | 'help' | 'preferences' | 'survey';

interface DemographicSurveyProps {
  onNavigate: (screen: Screen) => void;
  onGoBack: () => void;
}

export function DemographicSurvey({ onNavigate, onGoBack }: DemographicSurveyProps) {
  const [visitFrequency, setVisitFrequency] = useState('');
  const [ageGroup, setAgeGroup] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="border-b-2 border-black p-4 md:p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl mb-2">Optional Survey</h1>
              <p className="text-sm md:text-base text-neutral-600">
                Help us improve your gallery experience. This survey is completely optional.
              </p>
            </div>
            <button
              onClick={onGoBack}
              className="flex-shrink-0 p-2 hover:bg-neutral-100 ml-4"
              aria-label="Close survey"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {/* Opt-out Message */}
          <div className="bg-neutral-100 border border-neutral-400 p-4 md:p-6 mb-8">
            <p className="text-sm md:text-base text-neutral-700">
              Your responses are anonymous and will only be used to improve our services. 
              You can skip this survey or close it at any time.
            </p>
          </div>

          {/* Survey Questions */}
          <section className="space-y-8 mb-8">
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
          </section>

          {/* Action Buttons */}
          <section className="border-t border-neutral-400 pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onGoBack}
                className="flex-1 bg-black text-white px-6 py-4 text-base md:text-lg hover:bg-neutral-800"
              >
                Submit Survey
              </button>
              <button
                onClick={onGoBack}
                className="flex-1 border-2 border-neutral-400 px-6 py-4 text-base md:text-lg hover:bg-neutral-100"
              >
                Skip Survey
              </button>
            </div>
          </section>
        </main>
      </div>
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