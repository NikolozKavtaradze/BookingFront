import hotelData from "../hotel-list.json" assert {type: 'json'}

const hotel_container = document.getElementById('hotel-container');

const hotels = hotelData.hotels

const mostPopularHotels = hotels.sort((a,b) => b.review_scores_rating - a.review_scores_rating).slice(0,6);

console.log(mostPopularHotels)

const createHotelCard = (hotel) => {

    const id = hotel.id
    const hotelName = hotel.name

    const imageUrl = hotel.picture_url.url

    const price = hotel.price

    const country = hotel.country
    const street = hotel.street


    const hotelElement = document.createElement('div')
    hotelElement.classList.add('popular_card')

    hotelElement.addEventListener('click', () => {
        window.location.href = `hotel-details.html?hotelId=${id}`
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



mostPopularHotels.forEach(hotel => {
    createHotelCard(hotel)
});
