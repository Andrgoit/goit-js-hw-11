const e={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loadMoreBtn:document.querySelector(".load-more")};e.form.addEventListener("submit",(function(s){s.preventDefault(),e.gallery.innerHTML="",n.value=s.currentTarget.elements.searchQuery.value.trim(),n.resetPage(),""!==n.value&&n.fetchingUrl().then((n=>{e.loadMoreBtn.classList.remove("is-hidden"),t(n)})).catch((e=>{console.log(e)}));return})),e.loadMoreBtn.addEventListener("click",(function(){e.loadMoreBtn.classList.add("is-hidden"),n.fetchingUrl().then((n=>{e.loadMoreBtn.classList.remove("is-hidden"),t(n)}))})),e.loadMoreBtn.classList.add("is-hidden");const n=new class{fetchingUrl(){const e=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:3,page:this.page});return fetch(`https://pixabay.com/api/?key=28166430-49d596e3415ce5cac11c6cb0f&q=${this.searchValue}&${e}`).then((e=>{if(!e.ok)throw new Error(e.status);return this.incrementPage(),e.json()})).catch((e=>{console.log(e)}))}incrementPage(){this.page+=1}resetPage(){this.page=1}get value(){return this.searchValue}set value(e){this.searchValue=e}constructor(){this.searchValue="",this.page=1}};function t(n){const t=n.hits;if(0!==t.length){const n=t.map((({webformatURL:e,largeImageURL:n,tags:t,likes:s,views:a,comments:o,downloads:r})=>`<div class="photo-card">\n  <img src="${e}" alt="${t}" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes: </b>${s}\n    </p>\n    <p class="info-item">\n      <b>Views: </b>${a}\n    </p>\n    <p class="info-item">\n      <b>Comments: </b>${o}\n    </p>\n    <p class="info-item">\n      <b>Downloads: </b>${r}\n    </p>\n  </div>\n</div>`)).join("");e.gallery.insertAdjacentHTML("beforeend",n)}else console.log("ничего не найдено")}
//# sourceMappingURL=index.125ad804.js.map
