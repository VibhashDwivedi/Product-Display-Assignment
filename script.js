const fetchProductData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products data:', error);
      return [];
    }
  };
  
  
  const displayProductData = (filteredData) => {
    const productDataContainer = document.getElementById('product-data');
    productDataContainer.innerHTML = ''; // Clear previous data
  
    if (filteredData.length === 0) {
      const noDataElement = document.createElement('h1');
      noDataElement.className = 'text-center';
      noDataElement.textContent = 'No Data Found';
      productDataContainer.appendChild(noDataElement);
      return;
    }
  
    filteredData.map((product) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-3 mb-5';
  
      const cardDiv = document.createElement('div');
      cardDiv.className = 'card shadow border-0';
  
      const img = document.createElement('img');
      img.className = 'card-img-top h-100 m-auto d-block';
      img.src = product.thumbnail;
      img.alt = product.title;
  
      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.className = 'card-body';
  
      const category = document.createElement('h6');
      category.textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
      category.className = ' text-muted';
      
      const titleDiv = document.createElement('div');
      titleDiv.className = 'd-flex justify-content-between card-title';
      const title = document.createElement('h4');
      title.textContent = product.title;
  
      
  
      const rating = document.createElement('p');
    rating.className = 'card-text';
    rating.innerHTML = `<i class="fas fa-star text-warning"></i> ${product.rating}`;
  
      const price = document.createElement('h3');
      price.textContent = `$${product.price}`;
      price.className = 'float-end p-1';
  
      const cardFooterDiv = document.createElement('div');
      cardFooterDiv.className = 'card-footer';
  
      const viewButton = document.createElement('button');
      viewButton.textContent = 'Buy Now';
      viewButton.className = 'float-end btn btn-primary ';
  
  
  
      cardBodyDiv.appendChild(category);
      cardBodyDiv.appendChild(titleDiv);
      titleDiv.appendChild(title);
     
      cardBodyDiv.appendChild(rating);
      cardBodyDiv.appendChild(price);
  
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBodyDiv);
  
      colDiv.appendChild(cardDiv);
  
     cardDiv.appendChild(cardFooterDiv);
      cardFooterDiv.appendChild(viewButton);
  
      productDataContainer.appendChild(colDiv);
    });
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 10,
      speed: 500,
      glare: true,
      "max-glare": 0.5
    });
  };
  
  const filterProducts = async () => {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const productData = await fetchProductData();
    if (searchInput.length < 4) {
      displayProductData(productData); // Display all data if input is less than 4 characters
      return;
    }
    const filteredData = productData.filter(product => 
      product.title.toLowerCase().includes(searchInput) || product.category.toLowerCase().includes(searchInput)
    );
    displayProductData(filteredData);
  };
  
  document.addEventListener('DOMContentLoaded', async () => {
    const productData = await fetchProductData();
    displayProductData(productData); // Display all data initially
    document.getElementById('search-input').addEventListener('input', filterProducts);
  });