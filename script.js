// Caesar Cipher Logic
function caesarCipher(str, shift, encrypt = true) {
  return str.split('').map(char => {
    if (!/[a-zA-Z]/.test(char)) return char;
    const base = char === char.toUpperCase() ? 65 : 97;
    const mod = encrypt ? shift : -shift;
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + mod + 26) % 26) + base
    );
  }).join('');
}

// Rail Fence Cipher Encode/Decode
function railFence(str, rails, encrypt = true) {
  if (rails < 2) return str;
  let fence = Array.from({ length: rails }, () => []);
  let idx = 0, step = 1;
  for (let char of str) {
    fence[idx].push(char);
    if (idx === 0) step = 1;
    if (idx === rails - 1) step = -1;
    idx += step;
  }
  if (encrypt) return fence.flat().join('');
  
  // Decode
  let pos = 0;
  const pattern = [];
  idx = 0; step = 1;
  while (pattern.length < str.length) {
    pattern.push(idx);
    if (idx === 0) step = 1;
    if (idx === rails - 1) step = -1;
    idx += step;
  }
  const counts = Array(rails).fill(0);
  pattern.forEach(r => counts[r]++);
  const rows = fence.map((r,i) => str.slice(pos, pos += counts[i]).split(''));
  return pattern.map(r => rows[r].shift()).join('');
}

// Pigpen Cipher maps
const pigpenMap = {
  'A': '⍁','B': '⍂','C': '⍃','D': '⍄','E': '⌖','F': '⌗','G': '⌘','H': '⌙',
  'I': '⍀','J': '⌚','K': '⌛','L': '⌜','M': '⌝','N': '⌞','O': '⌟','P': '⌠',
  'Q': '⌡','R': '⌢','S': '⌣','T': '⌤','U': '⌥','V': '⌦','W': '⌧','X': '⌨',
  'Y': '〈','Z': '〉'
};

function pigpenCipher(str) {
  return str.toUpperCase().split('').map(ch =>
    pigpenMap[ch] || ch
  ).join('');
}
