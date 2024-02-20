# Grocery Billing Web App

The Grocery Billing Web App is a full-stack web application designed to facilitate inventory management and billing processes for local grocery businesses. It leverages Spring Boot for the backend and React.js for the frontend, providing an intuitive and user-friendly interface.

## Features

- **Inventory Management:** Add, update, and delete grocery items.
- **Billing System:** Generate bills for customers based on their purchases.
- **Local Language Integration:** Interact with the application in preferred languages.
- **Swagger Documentation:** Access API documentation using Swagger UI at [http://localhost:8080/swagger-ui/index.html#](http://localhost:8080/swagger-ui/index.html#).

## Technologies Used

### Backend:

- Java ![Java Icon](https://simpleicons.org/icons/java.svg)
- Spring Boot ![Spring Boot Icon](https://simpleicons.org/icons/spring.svg)
- MySQL ![MySQL Icon](https://simpleicons.org/icons/mysql.svg)

### Frontend:

- React.js ![React Icon](https://simpleicons.org/icons/react.svg)
- Tailwind CSS ![Tailwind CSS Icon](https://simpleicons.org/icons/tailwindcss.svg)

### API Documentation:

- Swagger UI

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/RAJAY04/GroceryBillingWebApp.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd GroceryBillingWebApp
    ```

3. **Start the backend server:**

    ```bash
    # Assuming Maven is installed
    mvn spring-boot:run
    ```

4. **Start MySQL:**

    ```bash
    #Assuming you have MySQL installed and configured
    mysql -u root -p
    ```

5. **Start the frontend server:**

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

5. **Open your browser and visit [http://localhost:3000/](http://localhost:3000/) to view the application.**

## Screenshots

### Inventory Page

![Inventory Page](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Inventory.jpg?raw=true)

### Billing Page

![Billing Page](https://github.com/RAJAY04/GroceryBillingWebApp/blob/main/Billing.jpg?raw=true)

## Usage

Navigate through the application to manage inventory and perform billing processes.

Use Swagger UI at [http://localhost:8080/swagger-ui/index.html#](http://localhost:8080/swagger-ui/index.html#) to access API documentation.

