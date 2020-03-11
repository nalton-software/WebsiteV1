async function setTest() {
  const test = document.getElementById("test");
  const reponse = await fetch("test.txt");
  const data = await reponse.text();
  test.textContent = data;
}

setTest();
