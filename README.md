# Contacts CRUD Application

This is a Contacts CRUD (Create, Read, Update, Delete) application built with Vue.js. The application allows users to manage their contacts and view transaction history for each contact.

## Features

- Add new contacts
- Edit existing contacts
- Delete contacts
- View contact details
- View transaction history for each contact
- Calculate and display the total amount of transactions

## Technologies Used

- Vue.js
- Vue Router
- Axios
- Tailwind CSS

## Project Setup

1. Clone the repository:

```
sh
git clone https://github.com/your-username/contacts-crud.git
cd contacts-crud
```

2. Install dependencies:
   `npm install`

3. Run the development server:
   `npm run dev`

4. Open your browser and navigate to:
   `http://localhost:3000`

## File Structure

- src/
  - components/
    - ContactButton.vue: Button component with customizable modes (primary, secondary, danger).
    - ContactForm.vue: Form component for adding and editing contacts.
    - ContactCards.vue: Component for displaying contacts in a 3-column card layout.
    - TransactionHistory.vue: Component for displaying transaction history and calculating the total amount.
  - views/
    - ContactList.vue: View for displaying the list of contacts.
    - ContactDetails.vue: View for displaying contact details and transaction history.
  - router/
    - index.js: Vue Router configuration.
  - App.vue: Main application component.

## API

The application uses a local JSON file (db.json) to store contact and transaction data. The structure of the JSON file is as follows:

```
[
  {
    "id": "1",
    "name": "Steve Washington",
    "email": "steve.washington@accenture.com",
    "contactNumber": "09381673771",
    "transactionHistory": [
      {
        "id": "t1",
        "date": "9/23/22",
        "merchant": "Penshoppe",
        "amount": "1,000"
      }
    ]
  },
  ...
]
```

## Usage

1. Add a New Contact: Click on the "Add New Contact" button and fill out the form.
2. Edit a Contact: Click on the "Edit" button next to a contact and update the information.
3. Delete a Contact: Click on the "Delete" button next to a contact to remove it.
4. View Contact Details: Click on a contact to view its details and transaction history.
