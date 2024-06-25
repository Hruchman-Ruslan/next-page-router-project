import { Event } from "@/types/event";

export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-af505-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events: Event[] = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter(({ isFeatured }) => isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
