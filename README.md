## Task

## Develop a login screen, it should allow only Admin to login, you can set (admin@domain.com/admin) as email/password, otherwise it should alert error of "Wrong Credentials". Use Sweet Alert Library for the alerts (https://sweetalert.js.org/guides/).After login, show a list of employees in a table and an add button (Floating Action Button on bottom right: HINT: Search 'floating action button') to add employee details.

## Develop an employees info form with the following details:
1. First Name 
2. Last Name 
3. Email 
4. Salary 
5. Job Start Date (Should be Javascript Date)

## More Features:
* Admin can Edit (Each Field), and Delete the Employees as well!
* Admin can logout and redirect to login screen.

## MORE HINTS:
* According to the lectures uptil now! 
* Your App.js render function must be like atleast:

```javascript
render(){
const { user, addForm } = this.state;
```
```javascript
return(
{/* when the user state is empty, show login */}
{!user && this.renderLogin()}
{/* when the user is logged in and Add button isn't clicked, show the List of Employees */}
{user && !addForm && this.showTable()}
{/* when the user is logged in and Add button is clicked, show the Add Form */}
{user && addForm && this.addEmployeeForm()}
)
}
```
## Answer

* **this repo**
* hosted [here](https://gmt95.github.io/react_assignment_3_gc/) 


***

I have used [Sweet Alert library](https://sweetalert.js.org/) for alerts


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).