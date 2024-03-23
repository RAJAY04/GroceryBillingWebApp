# Grocery Billing Web App

The Grocery Billing Web App is a full-stack web application designed to facilitate inventory management and billing processes for local grocery businesses. It leverages Spring Boot for the backend and React.js for the frontend, providing an intuitive and user-friendly interface.

## Features

- **Inventory Management:** Add, update, and delete grocery items.
- **Billing System:** Generate bills for customers based on their purchases.
- **Local Language Integration:** Interact with the application in preferred languages.
- **Swagger Documentation:** Access API documentation using Swagger UI at [http://localhost:8080/swagger-ui/index.html#](http://localhost:8080/swagger-ui/index.html#).

## Technologies Used

### Backend:

- Java
- Spring Boot
- MySQL

### Frontend:

- React.js
- Tailwind CSS


### API Documentation:

- Swagger UI

## Getting Started

1. **Fork the repository:**

   You can fork the repository by clicking on the "Fork" button at the top right corner of the GitHub page. This will create a copy of the repository in your own GitHub account.

2. **Clone the forked repository:**

   After forking, clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Your-Username/GroceryBillingWebApp.git
    ```

3. **Navigate to the project directory:**

    ```bash
    cd GroceryBillingWebApp
    ```

4. **Start the backend server:**

    ```bash
    # Assuming Maven is installed
    mvn spring-boot:run
    ```

5. **Start MySQL:**

    ```bash
    #Assuming you have MySQL installed and configured
    mysql -u root -p
    ```

6. **Start the frontend server:**

    ```bash
    # Navigate to the frontend directory
    cd frontend

    # Install dependencies
    npm install
    npm install js-cookie
    npm install axios

    # Start the server
    npm start
    ```

7. **Open your browser and visit [http://localhost:3000/](http://localhost:3000/) to view the application.**

## Screenshots

### Login Page

![Login](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Login.png?raw=true)

### Home Page

![HomePage](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/HomePage.png?raw=true)


### Inventory Page

![Inventory Page](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Inventory.png?raw=true)

### Billing Page

![Billing Page](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Billing.png?raw=true)

### Notification Page

![NotificationPage](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Notification.png?raw=true)

### Transaction Page

![TransactionPage](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Transaction.png?raw=true)

## Usage

Navigate through the application to manage inventory and perform billing processes.

Use Swagger UI at [http://localhost:8080/swagger-ui/index.html#](http://localhost:8080/swagger-ui/index.html#) to access API documentation.

