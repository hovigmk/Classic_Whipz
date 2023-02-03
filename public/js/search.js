var search;

const searchFormHandler = async (e) => {
    e.preventDefault();
  
    search = document.querySelector('#search').value.trim();
   
    if (search) {
      
      const response = await fetch(`/api/search`, {
        method: 'POST',
        body: JSON.stringify({ search }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
       
        document.location.replace(`/search/${search}`);
      } else {
        alert('Failed to create car');
      }
    }
  };

document
    .querySelector('.search-btn')
    .addEventListener('click', searchFormHandler);