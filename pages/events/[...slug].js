import EventList from "@/components/events/event-list"
import ResultsTitle from "@/components/results-title/results-title"
import Button from "@/components/ui/button"
import ErrorAlert from "@/components/ui/error-alert"
import { getFilteredEvents } from "@/dummy-data"
import { useRouter } from "next/router"
import { Fragment } from "react"
import EventsService from "../api/events"


export async function getServerSideProps(context) {
    const { query } = context
    const filteredData = query.slug
    const [filterdYear, filteredMonth] = filteredData
    const numYear = +filterdYear
    const numMonth = +filteredMonth
    return {
        props: {
            filteredEvents: await new EventsService().getFilteredEvents({
                year: numYear,
                month: numMonth
            })
        }
    }
}

function FilteredEventsPage({ filteredEvents }) {
    const { query } = useRouter()
    const filteredData = query.slug
    if (!filteredData) {
        return <p>Loading</p>
    }
    const [filterdYear, filteredMonth] = filteredData
    const numYear = +filterdYear
    const numMonth = +filteredMonth
    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 0 || numMonth > 12) {
        return <Fragment>
            <ErrorAlert><p>Something went wrong. Check your filters</p></ErrorAlert>
            <div className="center">
                <Button link='/events'>Show all events</Button>
            </div>
        </Fragment>
    }


    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert><p>No events found for chosen filter</p></ErrorAlert>
            <div className="center">
                <Button link='/events'>Show all events</Button>
            </div>
        </Fragment>
    }
    const date = new Date(numYear, numMonth - 1)
    return <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </Fragment>
}

export default FilteredEventsPage