// Simulated storage for registered properties
const properties = {};

// Role selection handling
document.querySelectorAll('input[name="role"]').forEach((element) => {
    element.addEventListener('change', (event) => {
        const role = event.target.value;
        document.getElementById('sellerSection').style.display = (role === 'seller') ? 'block' : 'none';
        document.getElementById('buyerSection').style.display = (role === 'buyer') ? 'block' : 'none';
    });
});

// Register Property
document.getElementById('registerProperty').addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const location = document.getElementById('location').value;

    if (title && location) {
        if (properties[title]) {
            document.getElementById('statusMessage').innerText = 'Property already registered!';
        } else {
            properties[title] = {
                location: location,
                owner: 'Seller',
            };
            document.getElementById('statusMessage').innerText = 'Property registered successfully!';
        }
    } else {
        document.getElementById('statusMessage').innerText = 'Please enter both title and location.';
    }
});

// Verify Property
document.getElementById('verifyProperty').addEventListener('click', () => {
    const title = document.getElementById('propertyId').value;

    if (title) {
        if (properties[title]) {
            document.getElementById('statusMessage').innerText =
                `Property found! Location: ${properties[title].location}, Owner: ${properties[title].owner}`;
        } else {
            document.getElementById('statusMessage').innerText = 'Property not found!';
        }
    } else {
        document.getElementById('statusMessage').innerText = 'Please enter the property title to verify.';
    }
});

// Transfer Property
document.getElementById('transferProperty').addEventListener('click', () => {
    const title = document.getElementById('propertyId').value;
    const newOwner = document.getElementById('transferTo').value;

    if (title && newOwner) {
        if (properties[title]) {
            properties[title].owner = newOwner;
            document.getElementById('statusMessage').innerText = `Ownership transferred to ${newOwner}!`;
        } else {
            document.getElementById('statusMessage').innerText = 'Property not found!';
        }
    } else {
        document.getElementById('statusMessage').innerText = 'Please enter both the title and new owner\'s name.';
    }
});
