const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const assessments = [
  { id: 1, name: "Coding Assessment - Java", role: "Software Engineer", skills: ["Java", "OOPs", "DSA"], weights: [2, 1, 1], duration: 45 },
  { id: 2, name: "Full Stack Developer Test", role: "Frontend Developer", skills: ["JavaScript", "React", "CSS"], weights: [1, 2, 1], duration: 60 },
  { id: 3, name: "Backend Developer Assessment", role: "Backend Developer", skills: ["Node.js", "Express", "Databases"], weights: [1, 1, 2], duration: 60 },
  { id: 4, name: "Data Analyst Challenge", role: "Data Analyst", skills: ["SQL", "Python", "Statistics"], weights: [1, 2, 1], duration: 50 },
  { id: 5, name: "DevOps Skills Test", role: "DevOps Engineer", skills: ["Docker", "CI/CD", "AWS"], weights: [1, 1, 2], duration: 40 },
  { id: 6, name: "QA Automation Test", role: "QA Engineer", skills: ["Selenium", "Java", "Testing"], weights: [1, 1, 1], duration: 35 },
  { id: 7, name: "UI/UX Design Exercise", role: "UX Designer", skills: ["Wireframing", "Figma", "User Research"], weights: [1, 1, 1], duration: 30 },
  { id: 8, name: "Leadership and Management Survey", role: "Team Lead", skills: ["Leadership", "Decision Making", "Conflict Resolution"], weights: [2, 1, 1], duration: 30 },
  { id: 9, name: "Communication Proficiency Test", role: "Customer Support", skills: ["Communication", "Listening", "Problem Solving"], weights: [2, 1, 1], duration: 20 },
  { id: 10, name: "Product Management Assessment", role: "Product Manager", skills: ["Roadmapping", "Market Research", "Stakeholder Management"], weights: [1, 1, 2], duration: 45 },
  { id: 11, name: "Sales Aptitude Test", role: "Sales", skills: ["Negotiation", "CRM", "Communication"], weights: [1, 1, 1], duration: 25 },
  { id: 12, name: "HR Competency Evaluation", role: "HR", skills: ["Recruitment", "Employee Relations", "Compliance"], weights: [1, 1, 1], duration: 30 }
];
app.post("/recommend", (req, res) => {
  const { role, skills } = req.body;
  const recommendations = assessments
    .filter(a => a.role === role)
    .map(a => {
      let score = 0, total = 0;
      a.skills.forEach((s, i) => {
        if (skills.includes(s)) score += a.weights[i];
        total += a.weights[i];
      });
      return { ...a, matchScore: Math.round((score/total)*100) };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
  res.json({ recommendations });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
