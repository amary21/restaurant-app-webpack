import data from '../DATA.json';

const loadData = () => {
    const postElement = document.querySelector(".posts")
    data.restaurants.forEach(restaurant => {
        const itemElement = document.createElement("article");
        itemElement.setAttribute("class", "post-item");
        itemElement.innerHTML = `<img class="post-item__thumbnail" src="${restaurant.pictureId}" alt="${restaurant.name}">
            <div class="post-item__content">
                <h1 class="post-item__name">${restaurant.name} (${restaurant.city})</h1>
                <h4 class="post-item__rate">${restaurant.rating}</h4>
                <p class="post-item__description">${restaurant.description}</p>
            </div>`;
        
        postElement.appendChild(itemElement);
    });
}

export default loadData;