function showFact() {
  const facts = [
    "🌐 Over 5 billion people use the Internet globally as of 2025!",
    "📧 The first email was sent by Ray Tomlinson in 1971.",
    "🔒 Using strong passwords reduces hacking risk by over 80%.",
    "🕵️‍♂️ Incognito mode does not hide your activity from your Internet provider.",
    "💡 Google processes over 8.5 billion searches every day!"
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  alert(randomFact);
}
