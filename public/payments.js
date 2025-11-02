function showFact() {
  const facts = [
    "💰 UPI transactions in India crossed 10 billion in 2024 alone!",
    "🔒 Always use official apps to reduce risk of fraud by over 80%.",
    "📱 Wallet apps can also store coupons and tickets securely.",
    "💡 Never share OTP or PIN with anyone — not even banks.",
    "🛡️ Using two-factor authentication makes digital payments much safer."
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  alert(randomFact);
}
