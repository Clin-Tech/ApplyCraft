function generateDummyOutreach(type, jobContext) {
  const company = jobContext?.company || "the company";
  const role = jobContext?.role || "this position";
  const location = jobContext?.location || "your location";

  const templates = {
    dm: `Hi there! 👋

I noticed your ${role} opening at ${company} and wanted to reach out directly. With my background in frontend development and passion for building user-centric products, I believe I'd be a strong fit for your team.

I'd love to learn more about the role and share how my experience aligns with what you're looking for. Would you be open to a brief conversation?

Looking forward to connecting!`,

    email: `Subject: Application for ${role} at ${company}

Dear Hiring Manager,

I am writing to express my strong interest in the ${role} position at ${company}. With my extensive experience in modern web development and a proven track record of delivering high-quality applications, I am excited about the opportunity to contribute to your team.

Throughout my career, I have:
• Built scalable React applications serving thousands of users
• Collaborated with cross-functional teams to deliver products on time
• Maintained high code quality standards through testing and reviews

I am particularly drawn to ${company} because of your commitment to innovation and user experience. I would welcome the opportunity to discuss how my skills and experience align with your team's needs.

Thank you for your consideration. I look forward to hearing from you.

Best regards,
[Your Name]`,

    coverLetter: `Dear Hiring Manager,

I am writing to apply for the ${role} position at ${company}, as advertised. With my background in full-stack development and passion for creating exceptional user experiences, I am confident I would be a valuable addition to your team.

In my current role, I have successfully led the development of several high-impact projects, including a complete redesign of our customer portal that increased user engagement by 40%. My technical expertise includes React, TypeScript, Node.js, and modern development practices including CI/CD and test-driven development.

What excites me most about this opportunity at ${company} is the chance to work on meaningful problems at scale. Your company's mission resonates deeply with my own values, and I am eager to contribute my skills to help achieve your goals.

I am particularly impressed by ${company}'s recent work, and I would be thrilled to bring my experience and enthusiasm to your team. The ${location} location is ideal for me, and I am ready to start immediately.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${company}'s continued success.

Sincerely,
[Your Name]`,
  };

  return templates[type] || templates.dm;
}

export default generateDummyOutreach;
