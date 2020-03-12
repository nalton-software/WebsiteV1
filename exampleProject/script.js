function makeRandomText() {
  var para = document.getElementById('writingPara');
  var randomText = '';

  for (var i = 0; i < 100000; i ++) {
    randomText += randomChar();
  }
  para.innerHTML = randomText;
}

function randomChar() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}\|;:,./<>?';
  var char = chars[Math.floor(Math.random() * chars.length)];
  return char;
}

makeRandomText();