class Ticket {
    public destination: string;
    public price: number;
    public status: string;

    constructor(destination: string, price: number, status: string) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
}

function initializeTickets(ticketDescriptions: Array<string>, sortingCriteria: string) {
    let tickets: Array<Ticket> = [];
    ticketDescriptions.forEach((t: string) => {
        let [destination, price, status] = t.split("|");
        tickets.push(new Ticket(destination, Number(price), status));
    });

    tickets = tickets.sort((a: Ticket, b: Ticket) => {
        if (a[sortingCriteria] < b[sortingCriteria]) {
            return - 1;
        }
        if (a[sortingCriteria] > b[sortingCriteria]) {
            return 1;
        }
        return 0;
    });

    return tickets;
}

let tickets = initializeTickets(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'price');

console.log(tickets);

