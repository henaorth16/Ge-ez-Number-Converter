document.addEventListener("DOMContentLoaded", function () {
  const numberInput = document.getElementById("numberInput");
  const convertButton = document.getElementById("convertButton");
  const result = document.getElementById("result");
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      return getValidOutPut();
    }
  });
  convertButton.addEventListener("click", getValidOutPut);

  function getValidOutPut() {
    const inputNumber = parseInt(numberInput.value, 10);

    if (!isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 100000000) {
      const geezNumber = convertToGeez(inputNumber);
      result.textContent = `${geezNumber}`;
    } else {
      result.textContent =
        "Please enter a valid number between 1 and 100,000,000.";
    }
  }

  function convertToGeez(number) {
    const geezSymbols = ["፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱"];
    const geezSymbolsTens = ["፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹", "፺"];
    const geezSymbolsHundreds = ["፻","፲፻","፳፻","፴፻","፵፻","፶፻","፷፻","፸፻","፹፻","፺፻",];

    if (number <= 10) {
      if (number === 10) {
        return geezSymbolsTens[0];
      }
      return geezSymbols[number - 1];
    } else if (number <= 100) {
      const tens = Math.floor(number / 10);
      const remaining = number % 10;
      if(number === 100){
        return geezSymbolsHundreds[0];
      } else if (remaining === 0) {
        return `${geezSymbolsTens[tens - 1]}`; 
      }else{
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
    } else if (number <= 10000000) {  //Below 10 million
      const onesMillion = Math.floor(number / 10000);
      const remaining = number % 10000;
      if (number === 10000000) {
        return `${geezSymbols[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}${geezSymbolsHundreds[0]}`;
      } else if (remaining === 0) {
        return `${geezSymbols[onesMillion - 1]}፻፻፻`;
      } else {
        return `${convertToGeez(onesMillion)}፻፻${convertToGeez(remaining)}`;
      }
    } else { // below 100 million
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
