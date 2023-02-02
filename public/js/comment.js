
const addComment = async (event) => {
    event.preventDefault();
debugger;
console.log(event.target.dataset);
    const carid = event.target.dataset.carid;
    const user_name = event.target.dataset.user_name;
    const message = document.querySelector('#comment-box').value.trim();
    console.log(message);
    
    debugger;

    if (message && carid) {
        
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ message, carid }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            
            document.location.replace(`/car/${carid}`);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', addComment);

    
