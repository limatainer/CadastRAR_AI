import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. AI features will be disabled.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export const generateUserDescription = async (name: string, tags: string[]): Promise<string> => {
  if (!genAI) {
    throw new Error('Gemini API not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate a professional and concise user profile description (2-3 sentences) for a person named "${name}" with the following interests/tags: ${tags.join(', ')}.

The description should be:
- Professional and friendly
- Highlight their interests naturally
- Be unique and personalized
- 50-100 words maximum
- Written in third person

Just provide the description text without any additional formatting or labels.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Error generating description:', error);
    throw new Error('Failed to generate description. Please try again.');
  }
};

export const isGeminiConfigured = (): boolean => {
  return !!API_KEY && API_KEY !== 'your_gemini_api_key_here';
};
