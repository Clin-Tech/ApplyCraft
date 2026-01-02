function getTypeDescription(type) {
  const descriptions = {
    dm: "Short, casual message for LinkedIn InMail",
    email: "Professional email with subject line",
    coverLetter: "Formal cover letter for applications",
  };
  return descriptions[type] || "";
}

export default getTypeDescription;
