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


}
