const BASE_URL = 'https://pixabay.com/api/';
const KEY = '28166430-49d596e3415ce5cac11c6cb0f';

export default class ApiService {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }

  fetchingUrl() {
    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    return fetch(`${BASE_URL}?key=${KEY}&q=${this.searchValue}&${searchParams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        this.incrementPage();
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value() {
    return this.searchValue;
  }

  set value(newSearchValue) {
    this.searchValue = newSearchValue;
  }
}
