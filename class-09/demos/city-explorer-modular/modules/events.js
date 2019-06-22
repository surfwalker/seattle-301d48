function getEvents(address, client, superagent) {
  const URL = `https://www.eventbriteapi.com/v3/events/search?location.address=${address}&location.within=1km`

  return superagent.get(URL)
    .set('Authorization', `Bearer ${process.env.EVENTBRITE_API_KEY}`)
    .then(data => data.body.events.map(event => new Event(event)));
}

function Event(event) {
  this.link = event.url,
  this.name = event.name.text,
  this.event_date = event.start.local,
  this.summary = event.summary
}

module.exports = getEvents;
