function truncateHeader(e) {
  const word = document.getElementById("logo-text");
  const originalText = "Westeros";
  const truncatedText = word.innerText.charAt(0);
  if (e === true) {
    word.innerHTML = truncatedText;
  } else {
    word.innerHTML = originalText;
  }
}

//Resize Event handler
function resizeEventHandler() {
  const smallDevice = window.matchMedia("(max-width: 786px)");
  smallDevice.addListener(handleDeviceChange);
  function handleDeviceChange(e) {
    if (e.matches) {
      truncateHeader(true);
    } else {
      truncateHeader(false);
    }
  }
  handleDeviceChange(smallDevice);
}

//AJAX Call for getting Product data
function getProductsData() {
  let api_endPoint = "/static/assets/data.json";
  document.getElementById("loader").classList.add("showLoader");
  fetch(api_endPoint, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .then(jsonData => {
      constructImages(jsonData);
      document.getElementById("loader").classList.remove("showLoader");
    })
    .catch(err => {
      document.getElementById("loader").classList.remove("showLoader");
      alert(err + "Error fetching Product details");
    });
}

//Construct Images
function constructImages(data) {
  let productsData = data.data.products;

  let fragment = document.createDocumentFragment();
  const parentElement = document.querySelector(".listing-wrapper");

  productsData.forEach(product => {
    if (!product.expired) {
      /* Indiv Product wrapper */
      const indivProduct = document.createElement("div");
      indivProduct.className = "indiv-product";

      /* Product Image */
      const indivImageCard = document.createElement("div");
      indivImageCard.className = "product-image";
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = "Product Image";
      indivImageCard.appendChild(image);
      indivProduct.appendChild(indivImageCard);

      fragment.appendChild(indivProduct);

      /* Product name */
      const indivProductName = document.createElement("div");
      indivProductName.className = "product-name";
      const Pname = document.createTextNode(product.name);
      indivProductName.appendChild(Pname);
      indivProduct.appendChild(indivProductName);

      fragment.appendChild(indivProduct);

      /* Product Author */
      const indivProductAuthor = document.createElement("div");
      indivProductAuthor.className = "product-author";
      const Aname = document.createTextNode(product.author);
      indivProductAuthor.appendChild(Aname);
      indivProduct.appendChild(indivProductAuthor);

      fragment.appendChild(indivProduct);
    }
  });
  parentElement.appendChild(fragment);
}

document.addEventListener("DOMContentLoaded", function () {
  resizeEventHandler();
  getProductsData();
});

//Search/Filter
document.querySelector('#search-input', addEventListener('input', search));

function search() {
  const searchText = document.querySelector('#search-input');
  const filterText = searchText.value.toLowerCase();
  const productNames = document.querySelectorAll('.product-name');
  productNames.forEach((item) => {
    let text = item.textContent;
    /* Enable search only for characters more than 3 */
    if(filterText.length >=3) {
      if (text.toLowerCase().includes(filterText.toLowerCase())) {
        item.parentElement.style.display = '';
      } else {
        item.parentElement.style.display = 'none';
      }
    } else {
      item.parentElement.style.display = '';
    }
  });
}