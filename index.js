document.addEventListener("DOMContentLoaded", function () {
  const numberInput = document.getElementById("numberInput");
  const convertButton = document.getElementById("convertButton");
  const result = document.getElementById("result");
  const convertToEnglishButton = document.getElementById(
    "convertToEnglishButton"
  );
  const geezInput = document.getElementById("geezInput");
  const resultArabic = document.getElementById("resultArabic");

  numberInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      return getValidOutPut();
    }
  });
  geezInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      return getValidEnglishOutPut();
    }
  });
  convertButton.addEventListener("click", getValidOutPut);

  function getValidOutPut() {
    const inputNumber = parseInt(numberInput.value, 10);
    if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 100000000) {
      const geezNumber = convertToGeez(inputNumber);
      result.textContent = `${geezNumber}`;
      result.style.fontSize = "clamp(1.5rem, 2.5vw, 4rem)"
    } else {
      result.textContent =
        "Please enter a valid number between 1 and 100,000,000.";
        result.style.fontSize = "1.3rem"
    }
  }
 
  function getValidEnglishOutPut() {
    const inputGeez = geezInput.value.trim();

    if (inputGeez.length > 0) {
      const arabicNumber = convertToEnglish(inputGeez);
      console.log(arabicNumber);
      resultArabic.innerText = `${arabicNumber}`;
    } else {
      resultArabic.innerText = "Please enter a Geez number.";
    }
  }

  ////////////////////////////
  convertToEnglishButton.addEventListener("click", getValidEnglishOutPut);
  ///////////////////////////

  function convertToGeez(number) {
    const geezSymbols = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
    const geezSymbolsTens = ["፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];
    const geezSymbolsHundreds = [
      "፻",
      "፲፻",
      "፳፻",
      "፴፻",
      "፵፻",
      "፶፻",
      "፷፻",
      "፸፻",
      "፹፻",
      "፺፻",
    ];

    if (number <= 10) {
      if (number === 10) {
        return geezSymbolsTens[0];
      }
      return geezSymbols[number - 1];
    } else if (number <= 100) {
      const tens = Math.floor(number / 10);
      const remaining = number % 10;
      if (number === 100) {
        return geezSymbolsHundreds[0];
      } else if (remaining === 0) {
        return `${geezSymbolsTens[tens - 1]}`;
      } else {
        return `${geezSymbolsTens[tens - 1]}${geezSymbols[remaining - 1]}`;
      }
    } else if (number <= 1000) {
      const hundreds = Math.floor(number / 100);
      const remaining = number % 100;
      if (number === 1000) {
        return `${geezSymbolsTens[0]}${geezSymbolsHundreds[0]}`;
      } else if (remaining === 0) {
        return `${geezSymbols[hundreds - 1]}፻`;
      } else {
        return `${
          hundreds === 1 ? "" : geezSymbols[hundreds - 1]
        }፻${convertToGeez(remaining)}`;
      }
    } else if (number <= 10000) {
      const thousands = Math.floor(number / 100);
      const remaining = number % 100;
      if (number === 10000) {
        return `${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
      } else if (remaining === 0) {
        return `${convertToGeez(thousands)}፻`;
      } else {
        return `${convertToGeez(thousands)}፻${convertToGeez(remaining)}`;
      }
    } else if (number <= 100000) {
      const tensThousand = Math.floor(number / 10000);
      const remaining = number % 10000;
      if (number === 100000) {
        return `${geezSymbolsTens[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
      } else if (remaining === 0) {
        return `${geezSymbols[tensThousand - 1]}፻፻`;
      } else {
        return `${
          tensThousand === 1 ? "" : geezSymbols[tensThousand - 1]
        }፻፻${convertToGeez(remaining)}`;
      }
    } else if (number <= 1000000) {
      const hundredsThousand = Math.floor(number / 10000);
      const remaining = number % 10000;
      if (number === 1000000) {
        return `${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
      } else if (remaining === 0) {
        return `${convertToGeez(hundredsThousand)}፻፻`;
      } else {
        return `${convertToGeez(hundredsThousand)}፻፻${convertToGeez(
          remaining
        )}`;
      }
    } else if (number <= 10000000) {
      //Below 10 million
      const onesMillion = Math.floor(number / 10000);
      const remaining = number % 10000;
      if (number === 10000000) {
        return `${geezSymbols[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
      } else if (remaining === 0) {
        return `${geezSymbols[onesMillion - 1]}፻፻፻`;
      } else {
        return `${convertToGeez(onesMillion)}፻፻${convertToGeez(remaining)}`;
      }
    } else {
      // below 100 million
      const tensMillions = Math.floor(number / 10000);
      const remaining = number % 10000;
      if (number === 100000000) {
        return `${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]} maximum!`;
      } else if (remaining === 0) {
        return `${convertToGeez(tensMillions)}፻፻፻`;
      } else {
        return `${convertToGeez(tensMillions)}፻፻${convertToGeez(remaining)}`;
      }
    }
  }
});

const code = 4969;

function convertToEnglish(num) {
  if (num.includes("፲፻")) {
    return 1000;
  } else if (
    (num.startsWith("፪፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፫፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፬፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፭፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፮፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፯፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፰፻") && (num.length == 2 || num.length == 3)) ||
    (num.startsWith("፱፻") && (num.length == 2 || num.length == 3))
  ) {
    return specConvertTwo(num);
  } else if (num.startsWith("፻") && num.length == 2) {
    return specConvert(num);
  } else if (num.codePointAt(0) === 4987 && num.length == 1) {
    return 100;
  } else if (num.length > 1 || num.codePointAt(0) > 4978) {
    if (num.length > 2 || num.codePointAt(0) > 4986) {
      if (num.length > 2 && num.length < 4) {
        return geezThreeConverter(num);
      } else if (num.length > 3 && num.length < 5) {
        return geezFourConverter(num);
      } else if (num.length > 4 && num.length < 6) {
        return geezFiveConverter(num);
      }
    } else {
      return geezTwoConverter(num);
    }
  } else {
    return num.codePointAt(0) - code + 1;
  }
}

function specConvertTwo(num) {
  let char = num.split("");
  if (num.length == 2) {
    return convertToEnglish(char[0]) * 100;
  } else {
    const leading = convertToEnglish(char[0]);
    const rest = specConvert(`${char[1]}${char[2]}`);
    let arr = rest.toString().split("");
    return `${leading}${arr[1]}${arr[2]}`;
  }
}

function specConvert(num) {
  let char = num.split("");
  if (char[1].codePointAt(1) > 4879) {
    return 100 + geezTwoConverter(char[1]);
  } else {
    return 100 + convertToEnglish(char[1]);
  }
}

function geezTwoConverter(num) {
  const chars = [];
  for (let i = 0; i < num.length; i++) {
    chars.push(num.codePointAt(i));
  }

  if (
    chars[0] === 4979 ||
    chars[0] === 4980 ||
    chars[0] === 4981 ||
    chars[0] === 4982 ||
    chars[0] === 4983 ||
    chars[0] === 4984 ||
    chars[0] === 4985 ||
    chars[0] === 4986
  ) {
    if (chars[0] === 4980) {
      if (chars.length > 1) {
        return chars[0] + 19 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 19 - code;
      }
    } else if (chars[0] === 4981) {
      if (chars.length > 1) {
        return chars[0] + 28 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 28 - code;
      }
    } else if (chars[0] === 4982) {
      if (chars.length > 1) {
        return chars[0] + 37 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 37 - code;
      }
    } else if (chars[0] === 4983) {
      if (chars.length > 1) {
        return chars[0] + 46 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 46 - code;
      }
    } else if (chars[0] === 4984) {
      if (chars.length > 1) {
        return chars[0] + 55 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 55 - code;
      }
    } else if (chars[0] === 4985) {
      if (chars.length > 1) {
        return chars[0] + 64 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 64 - code;
      }
    } else if (chars[0] === 4986) {
      if (chars.length > 1) {
        return chars[0] + 73 - code + chars[1] - code + 1;
      } else {
        return chars[0] + 73 - code;
      }
    }
    if (chars.length > 1) {
      return chars[0] + 10 - code + chars[1] - code + 1;
    } else {
      return chars[0] + 10 - code;
    }
  } else {
    const num1 = chars[0] - code + 1;
    const num2 = chars[1] - code + 1;
    return num1 + num2;
  }
}

function geezThreeConverter(num) {
  const chars = [];
  for (let i = 0; i < num.length; i++) {
    chars.push(num[i]);
  }
  return 100 + geezTwoConverter(`${chars[1]}${chars[2]}`);
}

function geezFourConverter(num) {
  const chars = [];
  for (let i = 0; i < num.length; i++) {
    chars.push(num[i]);
  }
  return (
    convertToEnglish(chars[0]) * 100 +
    geezTwoConverter(`${chars[2]}${chars[3]}`)
  );
}

function geezFiveConverter(num) {
  const chars = [];
  for (let i = 0; i < num.length; i++) {
    chars.push(num[i]);
  }
  const thousands = convertToEnglish(chars[0]) * 100;
  const hundreds = geezTwoConverter(`${chars[2]}${chars[3]}`);
  const tens = chars[4].codePointAt(0) - 4968; // Since it's a single character, we subtract 4968 to get the value

  return thousands + hundreds + tens;
}
