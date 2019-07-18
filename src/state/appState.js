import { observable, decorate, autorun } from 'mobx';

class AppState {
  // Session
  sessionToken = localStorage.getItem('token') || '';
  firstName = localStorage.getItem('name') || '';;

  // Flights & filter
  flights = [];
  filteredFlights = [];
  flight = {};
  flightFilter = {
    date: '',
    city: '',
    freeSeats: '',
  }
  applyFilter() {
    this.filteredFlights = this.flights
      .filter((flight) => {
        let filterResult = true;
        if (this.flightFilter.date) {
          filterResult = (new Date(flight.flys_at)).toLocaleDateString() === (new Date(this.flightFilter.date)).toLocaleDateString();
        }
        if (this.flightFilter.city) {
          filterResult = flight.name.includes(this.flightFilter.name);
        }
        if (this.flightFilter.freeSeats instanceof Number) {
          filterResult = this.flightFilter.freeSeats < (flight.no_of_seats - flight.no_of_booked_seats);
        }
        return filterResult;
      });
  }

  // Booking
  bookingCreated = false;
}

decorate(AppState, {
  sessionToken: observable,
  flights: observable,
  flight: observable,
  flightFilter: observable,
});

export const appState = new AppState();

autorun(() => {
});
