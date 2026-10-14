window.portfolioData = window.portfolioData || {};
window.portfolioData.projects = [
  {
    name: "AI Resume Builder",
    category: "Career tools / AI concept",
    description:
      "A concept for turning a resume and target job description into a focused, explainable review. It highlights relevant skills, spots experience that could use clearer evidence, and suggests stronger bullet points while leaving every edit in the applicant's hands.",
    tech: ["Resume parsing", "NLP", "React", "Node.js", "LLM review"],
    image: "/assets/project-resume-builder.svg",
  },
  {
    name: "Smart Expense Tracker",
    category: "Personal finance / Product concept",
    description:
      "A personal finance concept that organizes spending into useful categories, tracks recurring costs, and compares monthly budgets with actual activity. A simple dashboard surfaces unusual changes and lets people correct automatic classifications.",
    tech: [
      "React",
      "Express",
      "PostgreSQL",
      "Data visualization",
      "CSV import",
    ],
    image: "/assets/project-expense-tracker.svg",
  },
  {
    name: "AI Study Assistant",
    category: "Education / AI teaching concept",
    description:
      "An AI teaching assistant concept that explains difficult topics step by step using a learner’s own notes, then checks understanding with guided questions and short quizzes. It adapts follow-up practice to missed answers and keeps explanations grounded in the learner’s source material.",
    tech: ["RAG", "LLM", "Flashcards", "Quiz generation", "Progress tracking"],
    image: "/assets/project-ai-tutor.svg",
  },
];
