function showFact() {
  const facts = [
    "🏛️ Over 80% of government services in India are now available online.",
    "💡 Using official portals reduces paperwork and speeds up approvals.",
    "📄 Digital certificates are legally valid in most official procedures.",
    "🔒 Always verify the website URL ends with .gov.in for authenticity.",
    "🖥️ Citizens can apply for certificates and services without visiting offices physically.",
    "💾 DigiLocker allows you to store and share your documents digitally, reducing the need for physical copies."
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  alert(randomFact);
}
