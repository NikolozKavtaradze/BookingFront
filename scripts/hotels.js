import hotelsData from "../hotel-list.json" assert {type : 'json'}

const hotel_container = document.getElementById('hotel-container')

let hotels = hotelsData.hotels

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search)
    const location = params.get('locations')
    const checkinDate = params.get('checkinDate');
    const checkoutDate = params.get('checkoutDate');

    if(location && checkinDate && checkoutDate) {
        console.log("Parameters found, handling differently.")
        console.log(checkoutDate)
        console.log(location)
        console.log(checkinDate)


        const checkinDateObj = new Date(checkinDate);
        const checkoutDateObj = new Date(checkoutDate);

        const duration = (checkoutDateObj - checkinDateObj) / (1000 * 60 *  60 * 24)
        console.log(`Duration: ${duration} days`);

        hotels = hotels.filter(h => h.country == location)

        console.log(hotels)

        hotels.forEach(hotel => {
            createHotelCard(hotel,duration)
        })
    }
    else {
        hotels.forEach(hotel => {
            createHotelCard(hotel)
        });
    }
})

const createHotelCard = (hotel, duration) => {

    const id = hotel.id
    const hotelName = hotel.name

    const imageUrl = hotel.picture_url.url

    const price = duration == null ? hotel.price : hotel.price * duration

    const country = hotel.country
    const street = hotel.street


    const hotelElement = document.createElement('div')
    hotelElement.classList.add('popular_card')

    hotelElement.addEventListener('click', () => {
        window.location.href = `hotel-details.html?hotelId=${id}`
        if(duration != null){

            const bookingDetails = {
                hotelId: id,
                duration: duration
            };

            const bookingDetailsStr = JSON.stringify(bookingDetails)

            localStorage.setItem('bookingDetails',bookingDetailsStr)
        }
    })

    hotelElement.innerHTML = `
    <img src="${imageUrl}" alt="popular hotel"/>
    <div class="popular_content">
        <div class="popular_card_header">
            <h4>${hotelName}</h4>
            <h4>$${price}</h4>
        </div>
        <p>${street}, ${country}</p>
    </div>
    `;

    hotel_container.appendChild(hotelElement)

}