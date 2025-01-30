// Binær → Hex & ASCII
function convertBinaryToTextAndHex(binaryStr) {
    binaryStr = binaryStr.replace(/\s+/g, "");  // Fjern mellomrom

    if (!/^[01]+$/.test(binaryStr)) {
        return "Feil: Kun binære tall (0 og 1) tillatt!";
    }

    let length = binaryStr.length;

    // Padding til nærmeste multiplum av 4 for hex
    if (length % 4 !== 0) {
        let padLength = 4 - (length % 4);
        binaryStr = "0".repeat(padLength) + binaryStr;
        length += padLength;
    }

    let hexValue = parseInt(binaryStr, 2).toString(16).toUpperCase();

    let asciiText = "";
    if (length % 8 === 0) {
        for (let i = 0; i < length; i += 8) {
            let byte = binaryStr.substring(i, i + 8);
            asciiText += String.fromCharCode(parseInt(byte, 2));
        }
    }

    return asciiText ? `Hex: ${hexValue}\nASCII: ${asciiText}` : `Hex: ${hexValue}`;
}

// Tekst → Binær & Hex
function convertTextToBinaryAndHex(text) {
    let binaryStr = "";
    let hexStr = "";

    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        binaryStr += charCode.toString(2).padStart(8, "0") + " ";
        hexStr += charCode.toString(16).toUpperCase() + " ";
    }

    return `Binært: ${binaryStr.trim()}\nHex: ${hexStr.trim()}`;
}

// Hex → ASCII & Binær
function convertHexToASCIIAndBinary(hexStr) {
    hexStr = hexStr.replace(/\s+/g, "");

    if (!/^[0-9A-Fa-f]+$/.test(hexStr) || hexStr.length % 2 !== 0) {
        return "Feil: Kun gyldig hex (0-9, A-F) med partall antall tegn er tillatt!";
    }

    let asciiText = "";
    let binaryStr = "";

    for (let i = 0; i < hexStr.length; i += 2) {
        let hexByte = hexStr.substring(i, i + 2);
        let decimalValue = parseInt(hexByte, 16);
        asciiText += String.fromCharCode(decimalValue);
        binaryStr += decimalValue.toString(2).padStart(8, "0") + " ";
    }

    return `ASCII: ${asciiText}\nBinært: ${binaryStr.trim()}`;
}

// Hovedfunksjon som bestemmer konverteringstype
function convertInput() {
    let input = document.getElementById("userInput").value.trim();
    let result = "Ugyldig input!";

    console.log(`Input mottatt: ${input}`); // Debugging

    if (/^[01\s]+$/.test(input) && input.replace(/\s/g, "").length >= 4) {
        result = convertBinaryToTextAndHex(input);
    } else if (/^[A-Fa-f0-9\s]+$/.test(input) && input.replace(/\s/g, "").length % 2 === 0) {
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
