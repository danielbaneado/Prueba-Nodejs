import crypto from 'crypto';

// In-memory store for CAPTCHA challenges (token -> challenge)
// In production, consider using Redis or another distributed store
const captchaStore = new Map<string, { answer: number; createdAt: Date }>();

export interface CaptchaChallenge {
  token: string;
  question: string;
  answer: number;
}

export function generateCaptcha(): CaptchaChallenge {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];

  let answer: number;
  let question: string;

  switch (operation) {
    case '+':
      answer = num1 + num2;
      question = `¿Cuánto es ${num1} + ${num2}?`;
      break;
    case '-':
      answer = num1 - num2;
      question = `¿Cuánto es ${num1} - ${num2}?`;
      break;
    case '*':
      answer = num1 * num2;
      question = `¿Cuánto es ${num1} × ${num2}?`;
      break;
    default:
      answer = num1 + num2;
      question = `¿Cuánto es ${num1} + ${num2}?`;
  }

  const token = crypto.randomBytes(32).toString('hex');

  // Store the challenge for later verification
  captchaStore.set(token, { answer, createdAt: new Date() });

  // Clean up expired entries (older than 10 minutes)
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  for (const [key, value] of captchaStore.entries()) {
    if (value.createdAt < tenMinutesAgo) {
      captchaStore.delete(key);
    }
  }

  return {
    token,
    question,
    answer,
  };
}

export function verifyCaptcha(token: string, userAnswer: number): boolean {
  // Validate that userAnswer is a number
  if (typeof userAnswer !== 'number' || isNaN(userAnswer)) {
    return false;
  }

  // Look up the stored challenge
  const challenge = captchaStore.get(token);
  if (!challenge) {
    return false;
  }

  // Compare the answer
  const isValid = challenge.answer === userAnswer;

  // Remove the challenge after verification (one-time use)
  captchaStore.delete(token);

  return isValid;
}
