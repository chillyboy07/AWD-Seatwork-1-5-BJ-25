// array for buses and seat reservations
const buses = [
    { id: 1, name: "BORSCHE GT3 RS (MANILA - TOKYO)", seats: Array(5).fill(false), reservations: [] },
    { id: 2, name: "BISSAN R32 (MANILA - SEOUL)", seats: Array(5).fill(false), reservations: [] },
    { id: 3, name: "BOYOTA HI-ACE (MANILA - DUBAI)", seats: Array(5).fill(false), reservations: [] }
];

const busSelect = document.getElementById("bus");
const seatsContainer = document.getElementById("seats");
const checkAvailabilityButton = document.getElementById("reserved-seat");

// initialize the page
function initialize() {
    populateBusSelect();
    updateSeatDisplay(1); // default bus 1
}

// populate the dropdown with buses
function populateBusSelect() {
    buses.forEach(bus => {
        const option = document.createElement("option");
        option.value = bus.id;
        option.textContent = `${bus.name}`;
        busSelect.appendChild(option);
    });
}

// update seat display based on selected bus
function updateSeatDisplay(busId) {
    const selectedBus = buses.find(bus => bus.id === parseInt(busId));
    seatsContainer.innerHTML = ""; // clears previous seats

    selectedBus.seats.forEach((isReserved, index) => {
        const seat = document.createElement("div");
        seat.textContent = `S${index + 1}`;
        seat.classList.add("seat", isReserved ? "reserved" : "available");

        // allow reservation if seat is available
        if (!isReserved) {
            seat.addEventListener("click", () => reserveSeat(busId, index, seat));
        }

        seatsContainer.appendChild(seat);
    });
}

// reserves a seat
function reserveSeat(busId, seatIndex, seatElement) {
    const selectedBus = buses.find(bus => bus.id === parseInt(busId));

// asks for the name of the user
    if (!selectedBus.seats[seatIndex]) {
        const userName = prompt("Enter your name:");
        const reservationNumber = generateReservationNumber();
        selectedBus.seats[seatIndex] = true;
        selectedBus.reservations.push({
            seatNumber: seatIndex + 1,
            name: userName,
            reservationNumber: reservationNumber,
            dateTime: new Date().toLocaleString()
        });
        seatElement.classList.remove("available");
        seatElement.classList.add("reserved");
        seatElement.textContent = `RESV`; // mark reserved
        alert(`Seat ${seatIndex + 1} reserved on ${selectedBus.name}.\nReservation Number: ${reservationNumber}`);
    } else {
        alert("This seat is already reserved.");
    }
}

// gnerate unique reservation number
function generateReservationNumber() {
    return Math.floor(Math.random() * 1000); // generates random number
}

// check total available seats
function checkTotalAvailability() {
    const totalAvailable = buses.reduce((total, bus) => {
        return total + bus.seats.filter(seat => !seat).length;
    }, 0);
    const totalReserved = buses.reduce((total, bus) => {
        return total + bus.seats.filter(seat => seat).length;
    }, 0);

    alert(`Total available seats: ${totalAvailable}\nTotal reserved seats: ${totalReserved}`);
}

// Event Listeners
busSelect.addEventListener("change", () => updateSeatDisplay(busSelect.value));
checkAvailabilityButton.addEventListener("click", checkTotalAvailability);

// initialize on page load
initialize();
dawdadawdawdsaddadawddsadsa