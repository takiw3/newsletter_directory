import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import TopicsStep from './steps/TopicsStep';
import NewsletterInfoStep from './steps/NewsletterInfoStep';
import ToneStep from './steps/ToneStep';
import LanguageStep from './steps/LanguageStep';
import AudienceStep from './steps/AudienceStep';
import ProgressBar from './ProgressBar';
import { saveUserProfile } from '../../services/profiles';

export type OnboardingData = {
  topics: string[];
  newsletterName: string;
  newsletterPitch: string;
  tone: string;
  language: string;
  targetAudience: string;
};

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    userId: string;
    email: string;
    name: string;
  };
}

const TOTAL_STEPS = 5;

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, userData }) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [data, setData] = React.useState<OnboardingData>({
    topics: [],
    newsletterName: '',
    newsletterPitch: '',
    tone: '',
    language: '',
    targetAudience: '',
  });

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        const result = await saveUserProfile({
          id: userData.userId,
          email: userData.email,
          name: userData.name,
          topics: data.topics,
          newsletter_name: data.newsletterName,
          newsletter_pitch: data.newsletterPitch,
          tone: data.tone,
          language: data.language,
          target_audience: data.targetAudience,
        });

        if (result.success) {
          toast.success('Profile setup completed!');
          onClose();
        } else {
          toast.error('Failed to save profile data. Please try again.');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData({ ...data, [key]: value });
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {}}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle">&#8203;</span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="absolute right-4 top-4">
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

              <div className="mt-8">
                {currentStep === 1 && (
                  <TopicsStep
                    topics={data.topics}
                    onChange={(topics) => updateData('topics', topics)}
                  />
                )}
                {currentStep === 2 && (
                  <NewsletterInfoStep
                    name={data.newsletterName}
                    pitch={data.newsletterPitch}
                    onNameChange={(name) => updateData('newsletterName', name)}
                    onPitchChange={(pitch) => updateData('newsletterPitch', pitch)}
                  />
                )}
                {currentStep === 3 && (
                  <ToneStep
                    tone={data.tone}
                    onChange={(tone) => updateData('tone', tone)}
                  />
                )}
                {currentStep === 4 && (
                  <LanguageStep
                    language={data.language}
                    onChange={(language) => updateData('language', language)}
                  />
                )}
                {currentStep === 5 && (
                  <AudienceStep
                    targetAudience={data.targetAudience}
                    onChange={(audience) => updateData('targetAudience', audience)}
                  />
                )}
              </div>

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : currentStep === TOTAL_STEPS ? (
                    'Finish'
                  ) : (
                    'Next'
                  )}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OnboardingModal;