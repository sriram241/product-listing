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
function getProductsData() {
  let api_endPoint = "/src/assets/data.json";
  fetch(api_endPoint, {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json"
    })
  })
    .then(response => response.json())
    .then(jsonData => {
      constructImages(jsonData);
    })
    .catch(err => {
      alert(err + "Error fetching Product details");
    });
}

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

document.addEventListener("DOMContentLoaded", function() {
  resizeEventHandler();
  getProductsData();
});
