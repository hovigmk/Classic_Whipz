const newFormHandler = async (event) => {
    event.preventDefault();
  
    const model = document.querySelector('#car-model').value.trim();
    const price = document.querySelector('#car-price').value.trim();
    const description = document.querySelector('#car-desc').value.trim();
    const pictureId = document.querySelector('#car-picture-id').value.trim();
    const make = document.querySelector('#car-make').value.trim();
    const mileage = document.querySelector('#car-mileage').value.trim();
    const year = document.querySelector('#car-year').value.trim();
    debugger;
    if (model && price && description && pictureId && make && mileage && year) {
      
      const response = await fetch(`/api/cars`, {
        method: 'POST',
        body: JSON.stringify({ model, price, description, pictureId, make, mileage, year }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create car');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    debugger;
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete car');
      }
    }
  };
  
  document
    .querySelector('.new-car-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .getElementById('#deletethis')
    .addEventListener('click', delButtonHandler);
  