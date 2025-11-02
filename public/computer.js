function showFact() {
  const facts = [
    "💾 The first hard disk in 1956 could store only 5 MB of data — that’s less than a single photo today!",
    "🖱️ The first computer mouse, invented in 1964, was made of wood!",
    "⌨️ The QWERTY keyboard was designed for typewriters in the 1800s.",
    "💡 Always shut down properly — never directly switch off power!",
    "🧠 The CPU executes billions of instructions every second."
  ];

  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  alert(randomFact);
}
