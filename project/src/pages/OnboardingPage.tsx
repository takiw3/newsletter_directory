import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopicsStep from '../components/onboarding/steps/TopicsStep';
import NewsletterInfoStep from '../components/onboarding/steps/NewsletterInfoStep';
import ToneStep from '../components/onboarding/steps/ToneStep';
import LanguageStep from '../components/onboarding/steps/LanguageStep';
import AudienceStep from '../components/onboarding/steps/AudienceStep';
import { saveUserProfile } from '../services/profiles';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../contexts/ProfileContext';

const TOTAL_STEPS = 5;

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refreshProfile } = useProfile();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [data, setData] = React.useState({
    topics: [] as string[],
    newsletter_name: '',
    newsletter_pitch: '',
    tone: '',
    language: '',
    target_audience: '',
  });

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      try {
        if (!user) {
          throw new Error('No user found');
        }

        const userData = {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.name || '',
          topics: data.topics,
          newsletter_name: data.newsletter_name,
          newsletter_pitch: data.newsletter_pitch,
          tone: data.tone,
          language: data.language,
          target_audience: data.target_audience,
        };

        if (!userData.email) {
          throw new Error('User email is required');
        }

        const result = await saveUserProfile(userData);

        if (result.success) {
          await refreshProfile(); // Refresh the profile data
          toast.success('Profile setup completed!');
          navigate('/dashboard');
        } else {
          toast.error(result.error || 'Failed to save profile data');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred');
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

  const updateData = (key: string, value: any) => {
    setData({ ...data, [key]: value });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round((currentStep / TOTAL_STEPS) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-blue-100 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && (
              <TopicsStep
                topics={data.topics}
                onChange={(topics) => updateData('topics', topics)}
              />
            )}
            {currentStep === 2 && (
              <NewsletterInfoStep
                name={data.newsletter_name}
                pitch={data.newsletter_pitch}
                onNameChange={(name) => updateData('newsletter_name', name)}
                onPitchChange={(pitch) => updateData('newsletter_pitch', pitch)}
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
                targetAudience={data.target_audience}
                onChange={(audience) => updateData('target_audience', audience)}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : currentStep === TOTAL_STEPS ? (
                'Complete Setup'
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;