function binaryConverter(binaryStr) {
    // Valider at input kun inneholder 0 og 1
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

    // Hvis det kan tolkes som heksadesimal (nå er den et multiplum av 4)
    let hexValue = parseInt(binaryStr, 2).toString(16).toUpperCase();

    // Hvis det kan tolkes som ASCII (multiplum av 8)
    if (length % 8 === 0) {
        let text = "";
        for (let i = 0; i < length; i += 8) {
            let byte = binaryStr.substring(i, i + 8);
            text += String.fromCharCode(parseInt(byte, 2));
        }
        return `Hex: ${hexValue} | ASCII: ${text}`;
    }

    return `Hex: ${hexValue}`;
}

function convertBinary() {
    let input = document.getElementById("binaryInput").value.trim();
    let result = binaryConverter(input);
    document.getElementById("result").innerText = result;
}

document.getElementById("binaryInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        convertBinary();
    }
});