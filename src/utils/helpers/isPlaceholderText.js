function isPlaceholderText(text) {
  return (
    !text ||
    text.includes("[Hiring Manager]") ||
    text.includes("[Role]") ||
    text.includes("[Company]")
  );
}

export default isPlaceholderText;
