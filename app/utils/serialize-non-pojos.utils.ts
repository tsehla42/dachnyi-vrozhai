const serializeNonPOJOs = (value: object | null) => {
  return structuredClone(value);
};

export { serializeNonPOJOs };
