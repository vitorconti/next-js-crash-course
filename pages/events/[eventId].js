import EventContent from "@/components/events/event-content"
import EventSummary from "@/components/events/event-summary"
import { getEventById } from "@/dummy-data"
import { useRouter } from "next/router"
import { Fragment } from "react"
import EventLogistics from "@/components/events/event-logistics"
import ErrorAlert from "@/components/ui/error-alert"

function EventDetailPage() {
    const { query } = useRouter()
    const { eventId } = query
    const event = getEventById(eventId)
    if (!event) {
        return <ErrorAlert><p>No event found</p></ErrorAlert>
    }
    return <div>
        <Fragment>
            <EventSummary title={event.title} />
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    </div>
}
export default EventDetailPage