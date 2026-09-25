// Medicine database
const medicines = {

    "MED001": {
        name: "Paracetamol 500 mg",
        batch: "PCM12345",
        mfg: "2026-06-01",
        exp: "2028-05-31",
        manufacturer: "ABC Pharmaceuticals",
        storage: "Store in a cool and dry place"
    },

    "MED002": {
        name: "Vitamin C 500 mg",
        batch: "VTC67890",
        mfg: "2026-04-01",
        exp: "2027-12-31",
        manufacturer: "XYZ Pharmaceuticals",
        storage: "Store below 25°C"
    }

};


// Create QR scanner
let scanner = new Html5Qrcode("reader");


// Start camera
function startScanner() {

    document.getElementById("scanMessage").innerText =
        "Point your camera at the medicine QR code.";

    scanner.start(
        { facingMode: "environment" },

        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250
            }
        },

        function (decodedText) {

            // QR successfully scanned
            console.log("QR Code:", decodedText);

            showMedicine(decodedText);

            // Stop camera after successful scan
            scanner.stop();

        },

        function (errorMessage) {

            // QR not detected yet
            console.log("Scanning...");

        }
    )
        .catch(function (error) {

            alert(
                "Camera could not be started. Please allow camera permission."
            );

        });
}


// Display medicine information
function showMedicine(code) {

    let medicine = medicines[code.trim().toUpperCase()];

    if (medicine) {

        document.getElementById("result").style.display = "block";

        document.getElementById("name").innerText =
            medicine.name;

        document.getElementById("batch").innerText =
            medicine.batch;

        document.getElementById("mfg").innerText =
            medicine.mfg;

        document.getElementById("exp").innerText =
            medicine.exp;

        document.getElementById("manufacturer").innerText =
            medicine.manufacturer;

        document.getElementById("storage").innerText =
            medicine.storage;

        checkExpiry(medicine.exp);

    } else {

        alert("Medicine QR code not registered!");

    }
}


// Check expiry date
function checkExpiry(expiryDate) {

    let today = new Date();
    let expiry = new Date(expiryDate);

    let status = document.getElementById("status");

    if (expiry < today) {

        status.innerText = "❌ EXPIRED";

    } else {

        status.innerText = "✅ VALID - NOT EXPIRED";

    }
}