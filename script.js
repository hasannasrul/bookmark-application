const form = document.getElementById('submit');


//UI CLASS
class UI {
    static addSite() {

        const body = document.getElementById('body');
        let storageItems = JSON.parse(localStorage.getItem('bookmarks'));
        let output = '';
        storageItems.forEach(element => {
            output += `
            <div>
            <h4>${element.name}</h4>
            <a href='${element.url}' target="_blank">
            <button type="button" 
            class="btn btn-outline-info">visit</button>
            </a>
            <button type="button" 
            class="btn btn-danger remove">Remove</button>
            </div>
            <br><br>
            `;

        });
        body.innerHTML = output;

    }

    static removeSite(el) {
        if (el.classList.contains('remove')) {
            el.parentElement.remove();
        }
    }

    static clearFIelds() {
        form.reset();
    }


    static showAlert(message, bclass) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${bclass}`;
        alert.setAttribute('id', 'alertss');
        alert.appendChild(document.createTextNode(message));
        const container = document.querySelector('.alert');
        const jumbo = document.querySelector('.jumboo');
        container.insertBefore(alert, jumbo);

        //vanish in 1.5 sec
        setTimeout(() => document.getElementById('alertss').remove(), 1500);
    }
}

//on content load
document.addEventListener('DOMContentLoaded', UI.addSite);

//STORAGE CLASS
class Storage {

    static addSiteToStorage(name, url) {

        var obj = {
            name: name,
            url: url
        }

        let array = [];
        if (localStorage.getItem('bookmarks') === null) {
            array.push(obj);
            localStorage.setItem('bookmarks', JSON.stringify(array));
        } else {
            let temp = JSON.parse(localStorage.getItem('bookmarks'));
            temp.push(obj);
            localStorage.setItem('bookmarks', JSON.stringify(temp));
        }
    }

    static removeSiteToStorage(site) {
        let temp = JSON.parse(localStorage.getItem('bookmarks'));
        temp.forEach((element, index) => {
            if (element.name === site) {
                temp.splice(index, 1);
            }

        });
        localStorage.setItem('bookmarks', JSON.stringify(temp));

    }
}

//EVENT: ADD SITE
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const Sitename = document.getElementById('siteName');
    const Siteurl = document.getElementById('siteUrl');

    const name = Sitename.value;
    const url = Siteurl.value;

    if(name === '' || url === ''){
        UI.showAlert('Please Fill All The Fields','warning');
    }
    else{
    Storage.addSiteToStorage(name, url);
    UI.addSite();

    UI.clearFIelds();

    UI.showAlert('Bookmark Added successfully', 'success');
    }
})


//EVENT: REMOVE SITE
body.addEventListener('click', e => {
    //Remove From UI
    UI.removeSite(e.target);
    //Remove From Storage
    Storage.removeSiteToStorage(e.target.parentElement.children[0].innerHTML);
    //Show Alert
    UI.showAlert('Bookmark Removed', 'danger');
})