# bcm-delivery-sys

A full-stack web application that monitors delivery trucks. It provides information about the status of each truck, along with ID and driver.

Back-end REST API server is deployed on AWS and can be accessed via: https://3nrl59woq6.execute-api.us-east-1.amazonaws.com/dev/trucks


# API Specification
## GET /trucks
- Retrieves a list of all delivery trucks.

Example response:

```json
[{"id":1,"driver":"John","status":"Outbound for deliveries"},{"id":2,"driver":"Jane","status":"Outbound for deliveries"},{"id":3,"driver":"Bob","status":"Outbound for deliveries"},{"id":4,"driver":"Samantha","status":"Outbound for deliveries"}]
```

## GET /trucks/:id

- Retrieves a specific delivery truck by its id.
- Path parameter: id - the id of the delivery truck to retrieve
    Example response:

Example response:

```json
{
    "id": 1,
    "driver": "John Smith",
    "status": "available"
}
```

Error response:
```json
Status code: 404
Body: Truck with id {id} not found
```

## POST /trucks/add

- Description: Creates a new delivery truck.
- Request body:
driver - the name of the driver for the new truck
status - the status of the new truck

Example response:

```json
{
    "id": 1,
    "driver": "John Smith",
    "status": "available"
}
```

## PUT /trucks/add

- Description: Updates the driver and status of a delivery truck by its ID
- Request body:
driver - the name of the driver for the new truck
status - the status of the new truck


## DELETE /trucks/:id

- Description: Deletes a delivery truck by its ID
- Path parameter: id - the id of the delivery truck to retrieve
Example response:



# Technologies Used
- Server: Node.js (Express.js)
- Client: React.js (React-Beautiful-DnD)
- AWS Amplify
