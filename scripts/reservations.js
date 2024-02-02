import hotelData from "../hotel-list.json" assert {type: 'json'}

const hotel_container = document.getElementById('hotel-container');

const reservedHotelsDetails =  JSON.parse(localStorage.getItem('reservedHotels'))

console.log(reservedHotelsDetails)

document.addEventListener('DOMContentLoaded', () => {

    reservedHotelsDetails.forEach(details => {
        console.log(details)
        const hot = hotelData.hotels.find(h => h.id == details.id)
        console.log(hot)
        createHotelCard(hot,details.duration)
    });
    
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