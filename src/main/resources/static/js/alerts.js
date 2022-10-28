function createAlert(text) {
    let insertion = document.createElement('div');
    insertion.innerText = text;
    insertion.setAttribute('class', 'alert alert-success alert-dismissible fade show fixed-bottom');
    insertion.setAttribute('role', 'alert');
    insertion.style.marginTop='5px';
    insertion.style.textTransform='capitalize';
    insertion.style.width='300px';
    insertion.style.marginLeft = '10px';

    let closeBtn = document.createElement('button');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('class', 'btn-close');
    closeBtn.setAttribute('data-bs-dismiss', 'alert');
    closeBtn.setAttribute('aria-label', 'Close');

    insertion.appendChild(closeBtn);
    document.body.appendChild(insertion);
}