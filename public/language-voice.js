function readAloud() {
  const allText = document.body.innerText; // reads all visible text
  if (!allText) return;

  const utterance = new SpeechSynthesisUtterance(allText);
  utterance.rate = 1;

  // Use the language selected in Google Translate
  const langDropdown = document.querySelector("#google_translate_element select");
  const selectedLang = langDropdown ? langDropdown.value : 'en';
  utterance.lang = selectedLang || 'en-US';

  speechSynthesis.speak(utterance);
}

// Add a voice button
const voiceBtn = document.createElement("button");
voiceBtn.innerText = "🔊 Read Aloud";
voiceBtn.style.position = "fixed";
voiceBtn.style.top = "20px";
voiceBtn.style.right = "180px";
voiceBtn.style.zIndex = 999;
voiceBtn.style.fontSize = "16px";
voiceBtn.onclick = readAloud;
document.body.appendChild(voiceBtn);
