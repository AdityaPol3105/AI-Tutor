function showFact() {
  const facts = [
    "🔒 Cybersecurity awareness reduces online fraud by up to 70%.",
    "📧 Phishing attacks are the most common online scam targeting emails.",
    "🛡️ Two-factor authentication adds an extra layer of security to accounts.",
    "💻 Regularly updating software prevents hackers from exploiting vulnerabilities.",
    "🌍 Being safe online protects your personal and financial data."
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  alert(randomFact);
}
