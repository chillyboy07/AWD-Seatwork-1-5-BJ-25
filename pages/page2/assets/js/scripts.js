let seats = {
    bus1: [true, true, true, true, true],
    bus2: [true, true, true, true, true],
    bus3: [true, true, true, true, true]
};

function reserveSeat() {
    let userName = document.getElementById("name-input").value.trim();
    let selectedBus = document.getElementById("bus-select").value;
    let selectedSeat = document.getElementById("seat-select").value;

    // if name is empty
    if (userName === "") {
        alert("Please enter your name before reserving a seat.");
        return;
    }

    // if no bus selected
    if (selectedBus === "") {
        alert("Please select a bus for your trip.");
        return;
    }

    // if no seat selected
    if (selectedSeat === "") {
        alert("Please select a seat number.");
        return;
    }

    let seatIndex = parseInt(selectedSeat) - 1;

    // if the seat is available
    if (seats[selectedBus][seatIndex]) {
        seats[selectedBus][seatIndex] = false;
        document.getElementById("message").textContent = `✅ Seat ${seatIndex + 1} reserved for ${userName}. Proceed to payment.`;
        document.getElementById("payment-section").style.display = "block";
    } else {
        document.getElementById("message").textContent = `🚫 Seat ${seatIndex + 1} on ${selectedBus.replace('bus', 'Bus ')} is already taken.`;
    }
}

function confirmPayment() {
    let refNumber = document.getElementById("reference-number").value.trim();

    if (refNumber === "") {
        alert("Please enter a valid GCash reference number.");
        return;
    }

    document.getElementById("message").textContent = `✅ Payment successful! Seat ${selectedSeat + 1} is confirmed for ${userName} on ${selectedBus.replace('bus', 'Bus ')}.`;
    document.getElementById("payment-section").style.display = "none";
}

function cancelPayment() {
    seats[selectedBus][selectedSeat] = true;
    document.getElementById("message").textContent = `❌ Payment was canceled. Seat ${selectedSeat + 1} is now available again.`;
    document.getElementById("payment-section").style.display = "none";
}