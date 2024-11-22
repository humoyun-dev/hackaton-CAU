import {
  OpenAIChatRequest,
  OpenAIChatResponse,
  OpenAIMessage,
  OpenAIModelRequest,
  OpenAIModelResponse,
} from "./dtos";

const OPENAI_API_KEY =
  "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";

const OpenAIService = {
  /**
   * Creates a chat completion using OpenAI's chat models.
   * @param {OpenAIChatRequest} request - The request payload for the chat completion.
   * @returns {Promise<OpenAIChatResponse>} - The chat completion response.
   */
  async completions(request: OpenAIChatRequest): Promise<OpenAIChatResponse> {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify(request),
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      return data as OpenAIChatResponse;
    } catch (error) {
      console.error("Error with OpenAI API chat completions:", error.message);
      throw error;
    }
  },

  /**
   * Creates a text completion using OpenAI's non-chat models (e.g., `text-davinci-003`).
   * @param {OpenAIModelRequest} request - The request payload for the model completion.
   * @returns {Promise<OpenAIModelResponse>} - The model completion response.
   */
  async model(request: OpenAIModelRequest): Promise<OpenAIModelResponse> {
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      return data as OpenAIModelResponse;
    } catch (error) {
      console.error("Error with OpenAI API model completions:", error.message);
      throw error;
    }
  },

  /**
   * Converts a file (e.g., image) into a Base64 URL.
   * @param {File | Blob} file - The file to convert.
   * @returns {Promise<string>} - A Promise that resolves to the Base64 URL.
   */
  async fileToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  },
};

export default OpenAIService;
