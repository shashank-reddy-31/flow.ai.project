# Financial Tracker API  

## Setup and Run Instructions  

1. Clone the repository.  
2. Run `npm install` to install dependencies.  
3. Use `node index.js` to start the server.  
4. Test the API using Postman or any API testing tool.  

## API Endpoints  

- **POST /transactions**: Add a new transaction.  
- **GET /transactions**: Retrieve all transactions.  
- **GET /transactions/:id**: Retrieve a transaction by ID.  
- **PUT /transactions/:id**: Update a transaction by ID.  
- **DELETE /transactions/:id**: Delete a transaction by ID.  
- **GET /summary**: Retrieve a summary of transactions.  

### Example Request/Response  

Example of POST /transactions:  
Request:  
```json  
{  
    "type": "income",  
    "category": "Salary",  
    "amount": 3000,  
    "date": "2024-10-20",  
    "description": "Monthly salary"  
}
