import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/dummy-data"
import EventsService from "./api/events";

export async function getStaticProps() {
  return {
    props: {
      featuredEvents: await new EventsService().getFeaturedEvents(),
      revalidate: 10,
    }
  }
}

function HomePage({ featuredEvents }) {

  return <div>
    <EventList items={featuredEvents} />
  </div>
}
export default HomePage