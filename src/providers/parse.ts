export const cleanJsonString = (data: string): string => {
  return data.replace(/```json\n|\n```/g, "");
};

export const parseJson = (jsonString: string): Record<string, unknown> => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(
      "Invalid JSON format: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
};

export const toArray = (data: string): Record<string, unknown> => {
  const cleanedString = cleanJsonString(data);
  return parseJson(cleanedString);
};
