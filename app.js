// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0qzoPbKaBSRWY8OEt6E6uIDPkXDqCWWA",
  authDomain: "bnccfirebase.firebaseapp.com",
  databaseURL: "https://bnccfirebase-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bnccfirebase",
  storageBucket: "bnccfirebase.appspot.com",
  messagingSenderId: "643585168854",
  appId: "1:643585168854:web:1830aba112e1171b010077"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('emailid').value;
    var phone = document.getElementById('Phone').value;
    var message = document.getElementById('msgContent').value;

    // Initialize Firestore
    var db = firebase.firestore();

    // Reference to the collection in Firestore
    var messagesRef = db.collection('contact');

    // Add a document to the 'messages' collection
    messagesRef.add({
        name: name,
        email: email,
        phone: phone,
        message: message
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    alert("Message has been successfully sent");

    // Reset the form
    document.getElementById('contactForm').reset();
}

function validateInputs(name, email, phone, message) {
    if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields.');
        return false;
    }

    var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    var phoneRegex = /^08\d{10,12}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number starting with 08.');
        return false;
    }

    return true;
}
