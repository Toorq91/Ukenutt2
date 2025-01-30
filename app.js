// Binær → Hex & ASCII
function convertBinaryToTextAndHex(binaryStr) {
    let hexValue = parseInt(binaryStr, 2).toString(16).toUpperCase();
    let asciiText = binaryStr.match(/.{8}/g)?.map(byte => String.fromCharCode(parseInt(byte, 2))).join("") || "";

    return asciiText ? `Hex: ${hexValue}\nASCII: ${asciiText}` : `Hex: ${hexValue}`;
}

// Tekst → Binær & Hex
function convertTextToBinaryAndHex(text) {
    let binaryStr = text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
    let hexStr = text.split("").map(c => c.charCodeAt(0).toString(16).toUpperCase()).join(" ");

    return `Binært: ${binaryStr}\nHex: ${hexStr}`;
}

// Hex → ASCII & Binær
function convertHexToASCIIAndBinary(hexStr) {
    let bytes = hexStr.match(/.{2}/g) || [];
    let asciiText = bytes.map(byte => String.fromCharCode(parseInt(byte, 16))).join("");
    let binaryStr = bytes.map(byte => parseInt(byte, 16).toString(2).padStart(8, "0")).join(" ");

    return `ASCII: ${asciiText}\nBinært: ${binaryStr}`;
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
