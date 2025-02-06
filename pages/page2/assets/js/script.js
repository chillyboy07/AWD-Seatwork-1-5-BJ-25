let seats = {
    bus1: [true, true, true, true, true],
    bus2: [true, true, true, true, true],
    bus3: [true, true, true, true, true]
};

// load data from localStorage if available
let selectedBus = localStorage.getItem('selectedBus');
let selectedSeat = localStorage.getItem('selectedSeat');
let userName = localStorage.getItem('userName');
let paymentStatus = localStorage.getItem('paymentStatus');

// update the UI based on localStorage data
if (selectedBus && selectedSeat && userName) {
    document.getElementById("bus-select").value = selectedBus;
    document.getElementById("seat-select").value = selectedSeat;
    document.getElementById("name-input").value = userName;
    document.getElementById("message").textContent = `✅ Seat ${selectedSeat} reserved for ${userName}. ${paymentStatus === 'confirmed' ? 'Payment confirmed!' : 'Proceed to payment.'}`;

    if (paymentStatus === 'confirmed') {
        document.getElementById("payment-section").style.display = "none";
    } else {
        document.getElementById("payment-section").style.display = "block";
    }
}

function reserveSeat() {
    userName = document.getElementById("name-input").value.trim();
    selectedBus = document.getElementById("bus-select").value;
    selectedSeat = document.getElementById("seat-select").value;

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

        // save data to localStorage
        localStorage.setItem('selectedBus', selectedBus);
        localStorage.setItem('selectedSeat', selectedSeat);
        localStorage.setItem('userName', userName);
        localStorage.setItem('paymentStatus', 'pending');

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

    if (refNumber.length !== 8) {
        alert("Please enter a valid 8-character GCash reference number.");
        return;
    }

    // confirmation message
    alert(`✅ Payment successful! Seat ${selectedSeat} is confirmed for ${userName} on ${selectedBus.replace('bus', 'Bus ')}.`);

    // hide payment section after confirmation
    document.getElementById("payment-section").style.display = "none";

    // update localStorage with payment status
    localStorage.setItem('paymentStatus', 'confirmed');

    // display final confirmation message
    document.getElementById("message").textContent = `✅ Payment successful! Seat ${selectedSeat} is confirmed for ${userName} on ${selectedBus.replace('bus', 'Bus ')}.`;
}

function cancelPayment() {
    seats[selectedBus][selectedSeat - 1] = true; // adjusts seat index
    alert(`❌ Payment was canceled. Seat ${selectedSeat} is now available again.`);

    // hide payment section after cancellation
    document.getElementById("payment-section").style.display = "none";

    // update localStorage to reflect that the payment was canceled
    localStorage.setItem('paymentStatus', 'canceled');

    // display cancellation message
    document.getElementById("message").textContent = `❌ Payment was canceled. Seat ${selectedSeat} is now available again.`;

    // reset localStorage data after cancellation
    localStorage.removeItem('selectedBus');
    localStorage.removeItem('selectedSeat');
    localStorage.removeItem('userName');
}
