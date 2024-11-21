 
/**
 * Role of a message in the OpenAI chat context.
 */
export type OpenAIRole = 'system' | 'user' | 'assistant';

/**
 * Represents a single message in the OpenAI chat format.
 */
export interface OpenAIMessage {
  role: OpenAIRole; // Role can be 'system', 'user', or 'assistant'
  content: string;  // The textual content of the message
  base64Image?: string; // Optional: Base64-encoded image string
  fileReference?: string; // Optional: File ID reference for uploaded images
}

/**
 * Represents the payload for OpenAI chat completions.
 */
export interface OpenAIChatRequest {
  model: string; // Model to use, e.g., 'gpt-4' or 'gpt-3.5-turbo'
  messages: OpenAIMessage[]; // Array of messages forming the conversation
  temperature?: number; // Optional: controls randomness of the response
  max_tokens?: number; // Optional: maximum number of tokens in the response
  top_p?: number; // Optional: nucleus sampling parameter
  frequency_penalty?: number; // Optional: penalizes repeated phrases
  presence_penalty?: number; // Optional: encourages new topics in responses
}

/**
 * Represents a request for OpenAI completion (non-chat).
 */
export interface OpenAIModelRequest {
  model: string; // Model to use, e.g., 'text-davinci-003'
  prompt: string; // Input prompt for text completion
  temperature?: number; // Optional: controls randomness of the response
  max_tokens?: number; // Optional: maximum number of tokens in the response
  top_p?: number; // Optional: nucleus sampling parameter
  frequency_penalty?: number; // Optional: penalizes repeated phrases
  presence_penalty?: number; // Optional: encourages new topics in responses
}

/**
 * Represents the response from OpenAI chat completions.
 */
export interface OpenAIChatResponse {
  id: string; // Unique identifier for the request
  object: string; // Type of object, e.g., 'chat.completion'
  created: number; // Timestamp when the request was processed
  model: string; // Model used for the response
  choices: {
    index: number; // Index of the choice in case of multiple outputs
    message: OpenAIMessage; // The message content of the response
    finish_reason: string; // Reason for completion, e.g., 'stop' or 'length'
  }[];
  usage: {
    prompt_tokens: number; // Tokens used by the input
    completion_tokens: number; // Tokens used by the output
    total_tokens: number; // Total tokens used in the request
  };
}

/**
 * Represents the response from OpenAI completion (non-chat).
 */
export interface OpenAIModelResponse {
  id: string; // Unique identifier for the request
  object: string; // Type of object, e.g., 'text_completion'
  created: number; // Timestamp when the request was processed
  model: string; // Model used for the response
  choices: {
    text: string; // The text of the completion
    index: number; // Index of the choice in case of multiple outputs
    logprobs: null | any; // Log probabilities for the tokens
    finish_reason: string; // Reason for completion, e.g., 'stop' or 'length'
  }[];
  usage: {
    prompt_tokens: number; // Tokens used by the input
    completion_tokens: number; // Tokens used by the output
    total_tokens: number; // Total tokens used in the request
  };
}
