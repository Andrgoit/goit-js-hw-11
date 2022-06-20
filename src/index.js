const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '28166430-49d596e3415ce5cac11c6cb0f';
let page = 1;

form.addEventListener('submit', formHandler);
loadMoreBtn.addEventListener('click', formHandler);

function formHandler(e) {
  e.preventDefault();
  //   console.log(e.currentTarget.elements);
  const inputValue = e.currentTarget.elements.searchQuery.value;

  if (inputValue !== '') {
    // console.log(inputValue);
    fetchingUrl(inputValue)
      .then(response => {
        page += 1;
        markupImages(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return;
}

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 4,
  page: page,
});

function fetchingUrl(q) {
  return fetch(`${BASE_URL}?key=${KEY}&q=${q}&${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

function markupImages(images) {
  //   console.log(images);
  const imageArr = images.hits;
  if (imageArr.length !== 0) {
    const markup = imageArr
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${downloads}
    </p>
  </div>
</div>`;
        }
      )
      .join('');
    gallery.innerHTML = markup;
  } else {
    console.log('ничего не найдено');
  }
}
