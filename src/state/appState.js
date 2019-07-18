import { observable, decorate, autorun } from 'mobx';

class AppState {
  // Session
  sessionToken = localStorage.getItem('token') || '';
  firstName = localStorage.getItem('name') || '';;

  // Flights & filter
  flights = [];
  filteredFlights = [];
  flightFilter = {
    date: '',
    city: '',
    freeSeats: '',
  }
  applyFilter = applyFilterFn;
}

function applyFilterFn() {
  this.filteredFlights = this.flights
  .filter((flight) => {
    let filterResult = true;
    if (this.flightFilter.date) {
      filterResult = (new Date(flight.flys_at)).toLocaleDateString() === (new Date(this.flightFilter.date)).toLocaleDateString();
    }
    if (this.flightFilter.city) {
      filterResult = flight.name.includes(this.flightFilter.name);
    }
    if (this.flightFilter.freeSeats) {
      filterResult = (Number(this.flightFilter.freeSeats) < (flight.no_of_seats - flight.no_of_booked_seats));
    }
    return filterResult;
  });
}

decorate(AppState, {
  sessionToken: observable,
  flights: observable,
  filteredFlights: observable,
  flightFilter: observable,
});

export const appState = new AppState();

autorun(() => {
});
