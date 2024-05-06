let data = JSON.parse(localStorage.getItem('data'));

function saveDataToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(data));
}
renderData();
function renderData() {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.idno}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>
                <button class="edit-btn" onclick="editData(${item.id})">Edit</button>
                <button class="delete-btn"  onclick="deleteData(${item.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    saveDataToLocalStorage();
}

function addData() {
    const idno = document.getElementById('idno').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    var name_valid = /^[a-zA-Z\s]+$/;
    var email_valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phone_valid = /^[0-9]+$/;
if(!name.match(name_valid)){
    alert("Please Enter The Valid Name")
    return false;
}
if(!email.match(email_valid)){
    alert("Please Enter The Valid Email '@example.com'")
    return false;
}
if(!phone.match(phone_valid)){
    alert("Please Enter The Valid phone")
    return false;
}
    const isDuplicate = data.some(item => item.email === email);
    const idnoDuplicate = data.some(item => item.idno === idno);
    if (isDuplicate) {
        alert('Email already exists!');
        return;
    }
    if (idnoDuplicate) {
        alert("ID No Is Already Exist");
        return
    }
    if (name && email && phone && idno) {
        const newItem = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone,
            idno: idno
        };
        data.push(newItem);
        renderData();
        document.getElementById('formData').reset();
    } else {
        alert('Name and email are required.');
    }
}

function editData(id) {
    const item = data.find(item => item.id === id);
    if (item) {

        document.getElementById('idno').value = item.idno;
        document.getElementById('name').value = item.name;
        document.getElementById('email').value = item.email;
        document.getElementById('phone').value = item.phone;
    }
}

function deleteData(id) {
    data = data.filter(item => item.id !== id);
    renderData();
}



