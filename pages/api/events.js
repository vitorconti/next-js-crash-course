const port = 3333

class EventsService {
    port = 3333
    baseUrl = `http://localhost:${port}/`

    async getAllEvents() {
        return await (await fetch(this.baseUrl + 'events')).json()
    }
    async getFeaturedEvents() {
        const events = await this.getAllEvents()
        return events.filter((event) => event.isFeatured)
    }
    async getEventById(id = '') {
        return await (await fetch(`${this.baseUrl}events/${id}`)).json()
    }
    async getFilteredEvents(dateFilter) {
        const { year, month } = dateFilter;
        const events = await this.getAllEvents()
        let filteredEvents = events.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
        });

        return filteredEvents;
    }
}

export default EventsService