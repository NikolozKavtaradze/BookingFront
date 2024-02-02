import hotelData from "../hotel-list.json" assert {type: 'json'}

const reservedBookings = []

console.log('reservedBookings',reservedBookings)

document.addEventListener("DOMContentLoaded", () => {

    const hotel_container = document.getElementById('hotel-container')

    const location_container = document.getElementById('geo-location')

    const urlParams = new URLSearchParams(window.location.search);

    const hotelId = urlParams.get('hotelId')

    console.log(hotelId)

    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'))

    let duration
    if(bookingDetails != null) {

        duration = bookingDetails.duration
    }


    const hotel = hotelData.hotels.find(h => h.id == hotelId)

    const country = hotel.country
    const city = hotel.city
    const street =  hotel.street
    const imageUrl = hotel.xl_picture_url || hotel.picture_url.url

    console.log(imageUrl)
    const price = duration == null ? hotel.price : hotel.price * duration
    const description = hotel.description
    const summary = hotel.summary || "Not specified"
    
    const propertyType = hotel.property_type || "Not specified"
    const transit = hotel.transit || "Not specified"
    const access = hotel.access || "Not specified"

    const bathrooms = hotel.bathrooms
    const bedrooms = hotel.bedrooms
    const beds = hotel.beds

    const amenities = hotel.amenities

    const geolocation = hotel.geolocation

    const hotel_header = document.createElement('h2')
    hotel_header.classList.add('section_header')
    hotel_header.innerText = hotel.name

    const hotContainer = document.createElement('div')
    hotContainer.classList.add('hot_container')

    hotContainer.innerHTML = `
        <div class="hotel_card">
            <img src="${imageUrl}" alt="Hotel Image">
            <div class="hotel_info">
                <div class="location_info">
                    <h2>${country}, ${city}</h2>
                    <p>${street}</p>
                </div>
                <p class="price">$${price}</p>
            </div>
            <div class="description">
                <h3>Description</h3>
                <p>${description}</p>
            </div>
            <div class="amenities_room_headers">
                <h3>Amenities</h3>
                <h3>Rooms</h3>
            </div>
            <div class="amenities_room_content">
                <div class="amenities">
                    <ul>
                        ${generateAmenitiesList(amenities)}
                    </ul>
                </div>
                <div class="room_details">
                    <p>Bathrooms: ${bathrooms}</p>
                    <p>Bedrooms: ${bedrooms}</p>
                    <p>beds: ${beds}</p>
                </div>
            </div>
            <div class="summary">
                <h3>Summary</h3>
                <p>${summary}</p>
            </div>
            <div class="property_details_headers">
                <h4>Type</h4>
                <h4>Transit</h4>
                <h4>Access</h4>
            </div>
            <div class="property_details">
                <p>${propertyType}</p>
                <p>${transit}</p>
                <p>${access}</p>
            </div>
        </div>
    `

    const reserve_section = document.createElement('section')
    reserve_section.classList.add('reservation_section', 'section_container')

    const reserve_group = document.createElement('div')
    reserve_group.classList.add('reserve_group')

    const reserve_button = document.createElement('button')
    reserve_button.innerText = 'Reserve'
    reserve_button.addEventListener('click', () =>{
        const reservedDetails = {
            id: hotelId,
            duration: duration

        }
        reservedBookings.push(reservedDetails)

        localStorage.setItem('reservedHotels',JSON.stringify(reservedBookings))

        localStorage.removeItem('bookingDetails')
    })

    reserve_group.appendChild(reserve_button)

    reserve_section.appendChild(reserve_group)

    hotel_container.appendChild(hotel_header)
    hotel_container.appendChild(hotContainer)
    hotel_container.appendChild(reserve_section)

    location_container.innerHTML = `
    <iframe
    width="800"
    height="500"
    frameborder="0"
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAE5TgNBgFJpB3mENfPCG5gPDJy9kwyjCs&q=${geolocation.lat},${geolocation.lon}"
    allowfullscreen>
  </iframe>
    `

})

function generateAmenitiesList (amenities) {
    return amenities.map(amenity => `<li>${amenity}</li>`).join('');
}
