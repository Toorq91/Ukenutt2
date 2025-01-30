// Binær → Hex & ASCII
function convertBinaryToTextAndHex(binaryStr) {
    binaryStr = binaryStr.replace(/\s+/g, "");  // Fjern mellomrom

    // Padding til nærmeste multiplum av 4 for hex
    let padLength = (4 - (binaryStr.length % 4)) % 4;
    binaryStr = "0".repeat(padLength) + binaryStr;

    let hexValue = parseInt(binaryStr, 2).toString(16).toUpperCase();
    let asciiText = "";

    if (binaryStr.length % 8 === 0) {
        for (let i = 0; i < binaryStr.length; i += 8) {
            asciiText += String.fromCharCode(parseInt(binaryStr.substring(i, i + 8), 2));
        }
    }

    return asciiText ? `Hex: ${hexValue}\nASCII: ${asciiText}` : `Hex: ${hexValue}`;
}

// Tekst → Binær & Hex
function convertTextToBinaryAndHex(text) {
    let binaryStr = [...text].map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    let hexStr = [...text].map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(" ");

    return `Binært: ${binaryStr}\nHex: ${hexStr}`;
}

// Hex → ASCII & Binær
function convertHexToASCIIAndBinary(hexStr) {
    hexStr = hexStr.replace(/\s+/g, "");

    let asciiText = "";
    let binaryStr = "";

    for (let i = 0; i < hexStr.length; i += 2) {
        let decimalValue = parseInt(hexStr.substring(i, i + 2), 16);
        asciiText += String.fromCharCode(decimalValue);
        binaryStr += decimalValue.toString(2).padStart(8, "0") + " ";
    }

    return `ASCII: ${asciiText}\nBinært: ${binaryStr.trim()}`;
}

// Hovedfunksjon som bestemmer konverteringstype
function convertInput() {
    let input = document.getElementById("userInput").value.replace(/\s+/g, ""); // Fjern mellomrom globalt
    let result = "Ugyldig input!";

    console.log(`Input mottatt: ${input}`); // Debugging

    if (/^[01]+$/.test(input) && input.length >= 4) {
        result = convertBinaryToTextAndHex(input);
    } else if (/^[A-Fa-f0-9]+$/.test(input) && input.length % 2 === 0) {
        result = convertHexToASCIIAndBinary(input);
    } else {
        result = convertTextToBinaryAndHex(input);
    }

    document.getElementById("result").innerText = result;
}

// Enter-knapp event
document.getElementById("userInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        convertInput();
    }
});
