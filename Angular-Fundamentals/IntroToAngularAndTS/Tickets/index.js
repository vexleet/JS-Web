var Ticket = /** @class */ (function () {
    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
    return Ticket;
}());
function initializeTickets(ticketDescriptions, sortingCriteria) {
    var tickets = [];
    ticketDescriptions.forEach(function (t) {
        var _a = t.split("|"), destination = _a[0], price = _a[1], status = _a[2];
        tickets.push(new Ticket(destination, Number(price), status));
    });
    tickets = tickets.sort(function (a, b) {
        if (a[sortingCriteria] < b[sortingCriteria]) {
            return -1;
        }
        if (a[sortingCriteria] > b[sortingCriteria]) {
            return 1;
        }
        return 0;
    });
    return tickets;
}
var tickets = initializeTickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'], 'price');
console.log(tickets);
