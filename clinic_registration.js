//variable selectors
let regForm = document.getElementById('registrationForm');
let btnSubmit = document.getElementById('submit');
let fName = document.querySelector('#fName');
let mName = document.querySelector('#mName');
let lName = document.querySelector('#lName');
let address = document.querySelector('#address');
let mobile = document.querySelector('#mobile');
let bDate = document.querySelector('#bDate');
let gender = document.querySelector(`input[name="gender"]:checked`);
let medicalHistory = document.getElementsByName('medHistory');
let symptoms = document.querySelector('#symptoms');;
let medication = document.querySelector('#medication');

let yesRadio = document.getElementById('yes');
let medicationInput = document.getElementById('medication-other');

//error small selector
let errorFName = document.getElementById('error-fname');
let errorLName = document.getElementById('error-lname');
let errorAddress = document.getElementById('error-address');
let errorMobile = document.getElementById('error-mobile');
let errorBDate = document.getElementById('error-bdate');

let patientRecords = [];

// All checkbox will untick if none is tick
function ifNone() {
    for (let i = 0; i < medicalHistory.length; i++) {
        medicalHistory[i].checked = false;
    }
}

//If any of the checkbook is tick, none will be untick
medicalHistory.forEach(cb => {
    cb.addEventListener('click', () => {
        let noneSelected = document.getElementById('none');
        noneSelected.checked = false;
    })

})

// Enable medication text input
function medicationEnable() {
    medicationInput.disabled = false;
}

// Disable medication text input
function medicationDisable() {
    medicationInput.disabled = true;
    medicationInput.value = '';
}

// Form Submit
regForm.addEventListener('submit', getAllData);

function resetForm() {
    document.querySelector('#registrationForm').reset();
}

function getAllData(e) {
    e.preventDefault();
    //variables
    let fNameVal = fName.value.trim();
    if (((fNameVal.length) < 2) || !(/^[A-Za-z\s]+$/.test(fNameVal))) {
        errorFName.textContent = 'Enter valid first name';
        errorFName.style.color = 'red';
    } else {
        errorFName.textContent = '';
    }

    let mNameVal = mName.value.trim();

    let lNameVal = lName.value.trim();
    if (((lNameVal.length) < 2) || !(/^[A-Za-z\s]+$/.test(lNameVal))) {
        errorLName.textContent = 'Enter valid last name';
        errorLName.style.color = 'red';
    } else {
        errorLName.textContent = '';
    }

    let addressVal = address.value.trim();
    if (addressVal.length < 2) {
        errorAddress.textContent = 'Please input complete address.';
        errorAddress.style.color = 'red';
    } else {
        errorAddress.textContent = '';
    }

    let gender = document.querySelector(`input[name="gender"]:checked`);
    let genderVal = gender.value;


    // date validation
    let bDateVal = bDate.value;
    bDateVal = new Date(bDateVal);
    let currentDate = new Date();


    if (bDateVal > currentDate) {
        errorBDate.textContent = 'Birth date should not be future date';
        errorBDateValue = errorBDate.textContent;
        errorBDate.style.color = 'red';
    } else {
        errorBDate.textContent = '';
    }

    bDateVal = bDateVal.toISOString().slice(0, 10); // YYYY-MM-DD
    //mobile number validation  
    let mobileVal = mobile.value.trim();
    if (mobileVal.length > 11 || mobileVal.length < 11) {
        errorMobile.textContent = 'Mobile number should be 11 digits.';
        errorMobileValue = errorMobile.textContent;
        errorMobile.style.color = 'red';
    } else {
        errorMobile.textContent = '';
    }

    // checkbox medical history
    //getting the checked value
    let medHistoryArray = [];
    let medHistory = document.querySelectorAll(`input[name="medHistory"]:checked`);
    medHistory.forEach((medH) => {
        medHistoryArray.push(medH.value);
    })

    //multiple selection symptoms
    //getting the checked value
    let symptomsArray = [];
    for (let symp of symptoms) {
        if (symp.selected) {
            symptomsArray.push(symp.value);
        }
    }

    // medication
    //getting the value 
    let medicationArray = [];
    if (document.querySelector('input[name="medication"]:checked')) {
        let medication = document.querySelector('input[name="medication"]:checked');
        let medicationVal = medication.value;
        console.log(medicationVal, medication.value);

        if (medicationVal === 'Yes') {
            if (document.getElementById('medication-other').value === '') {
                medicationArray = 'Not specified';
            } else {
                medicationArray = document.getElementById('medication-other').value;
            }
        } else if (medicationVal === 'No') {
            medicationArray = 'No';
        }
    }
    // (((errorFName) || (errorLName) || (errorAddress) || (errorMobile) || (errorBDate)) &&
    console.log(errorFName.textContent, errorLName.textContent, errorAddress.textContent, errorMobile.textContent, errorBDate.textContent);

    if ((errorFName.textContent !== '') || (errorLName.textContent !== '') || (errorAddress.textContent !== '') || (errorMobile.textContent !== '') || (errorBDate.textContent !== '')) {

        alert('Please fill out the form correctly.');


    } else {
        let patientRecord = {
            id: Date.now(),
            firstName: fNameVal,
            middleName: mNameVal,
            lastName: lNameVal,
            address: addressVal,
            mobileNumber: mobileVal,
            birthDate: bDateVal,
            gender: genderVal,
            medicalHistory: medHistoryArray,
            currentSymptoms: symptomsArray,
            medications: medicationArray
        }
        patientRecords.push(patientRecord);

        console.table(patientRecords);
        
        //creating JSON
        localStorage.setItem('Patient Records', JSON.stringify(patientRecords));
    
        resetForm();

        alert(`Patient added!
        First Name: ${fNameVal}
        Middle Name: ${mNameVal}
        Last Name: ${lNameVal}
        Address: ${addressVal}
        Mobile: ${mobileVal} 
        Birthdate: ${bDateVal}
        Genger: ${genderVal}
        Medical History: ${medHistoryArray}
        Symptoms: ${symptomsArray}
        Medication: ${medicationArray}`);
    }
}

