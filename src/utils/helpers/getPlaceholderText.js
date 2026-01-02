function getPlaceholderText(type) {
  const placeholders = {
    dm: "Hi [Hiring Manager],\n\nI came across your [Role] opening at [Company] and I'm very interested...",
    email:
      "Subject: Application for [Role] Position\n\nDear Hiring Manager,\n\nI am writing to express my interest in the [Role] position...",
    coverLetter:
      "Dear Hiring Manager,\n\nI am writing to apply for the [Role] position at [Company]. With my background in...",
  };
  return placeholders[type] || placeholders.dm;
}
export default getPlaceholderText;
