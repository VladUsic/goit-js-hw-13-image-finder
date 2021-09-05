export default function showCountries(inputValue, number) {
   return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=${number}&per_page=12&key=22330478-3bd9f5a2d8db4972b1e40fa44`)
        .then(response => {
            return response.json();
        })
};

