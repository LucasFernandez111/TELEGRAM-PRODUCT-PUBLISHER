export const isRichValue = (value: any) => {
  return Boolean(value && Array.isArray(value.richText));
};

export const richToString = (rich: any) =>
  rich.richText
    .map(({ text }: { text: string }) => text)
    .filter((text: any) => text.includes("yupoo.com"))
    .join("");
