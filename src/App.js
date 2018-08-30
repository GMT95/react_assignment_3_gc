import React, { Component } from 'react';
import swal from 'sweetalert'
import './App.css';

class App extends Component {
  constructor() {
    super();

  this.state = {
      employees: [{
        firstName: "GM",
        lastName: "Talha",
        email: "gmt@gmt.com",
        salary: 50000,
        jobStartDate: new Date().toISOString().split('T')[0]   
      },{
        firstName: "GM",
        lastName: "Talha",
        email: "gmt@gmt.com",
        salary: 50000,
        jobStartDate: new Date().toISOString().split('T')[0]
      }],
      emailValue: "",
      passValue: "",
      user: false,
      addBtnValue: "+",
      addBtnValueCond: true,
      //states for Employee form
      firstNameEmp: "",
      lastNameEmp: "",
      emailEmp: "",
      salaryEmp: "",
      dateEmp:  "", 
      //states for Editing Employee 
      edit: false,
      currentIndex: null
    }
  }

  emailFunc(e) {
    this.setState({
      emailValue: e.target.value
    })
  }

  passFunc(e) {
    this.setState({
      passValue: e.target.value
    })
  } 

  handleSubmit(e) {
    const {emailValue,passValue} = this.state;
    if(emailValue === "" || passValue === "") {
      swal(`Please fill all fields`)  
    }
    else {
      if(emailValue === "admin@domain.com" && passValue === "admin") {
        this.setState({
          emailValue: '',
          passValue: '',
          user: true
        });    
      }
      else {
        swal(`Wrong Credentials`);
      }
    }
    e.preventDefault();
  }

  //Start ==> functions for employee form
  
  firstNameEmpFunc(e) {
    this.setState({
      firstNameEmp: e.target.value
    })
  }

  lastNameEmpFunc(e) {
    this.setState({
      lastNameEmp: e.target.value
    })
  }

  emailEmpFunc(e) {
    this.setState({
      emailEmp: e.target.value
    })
  }

  salaryEmpFunc(e) {
    this.setState({
      salaryEmp: e.target.value
    })
  }

  dateEmpFunc(e) {
    this.setState({
      dateEmp: e.target.value
    })
  }

  addEmpFunc(e) {
    e.preventDefault()
    const {firstNameEmp,lastNameEmp,emailEmp,salaryEmp,employees,dateEmp,addBtnValueCond} = this.state;
    if(firstNameEmp === "" || lastNameEmp === "" || emailEmp === "" || salaryEmp === "") {
      swal("Please fill all fields");
    }
    else {
      employees.push({
        firstName: firstNameEmp,
        lastName: lastNameEmp,
        email: emailEmp,
        salary: salaryEmp,
        jobStartDate: dateEmp ? dateEmp : new Date().toISOString().split('T')[0]
      });
      this.setState({
        employees,
        firstNameEmp: "",
        lastNameEmp: "",
        emailEmp: "",
        salaryEmp: "",
        jobStartDate: "",
        dateEmp: "",
        addBtnValueCond: !addBtnValueCond,
        addBtnValue: addBtnValueCond ? "x" : "+"
      })
      swal("User added Successfully");
      e.preventDefault();
    }
    e.preventDefault();
  }
  
  editEmpFunc(e) {
    e.preventDefault();
    console.log('Editing');
    const {firstNameEmp,lastNameEmp,emailEmp,salaryEmp,employees,dateEmp,addBtnValueCond,currentIndex} = this.state;
    if(firstNameEmp === "" || lastNameEmp === "" || emailEmp === "" || salaryEmp === "") {
      swal("Please fill all fields");
    }
    else {
      employees[currentIndex] = {
        firstName: firstNameEmp,
        lastName: lastNameEmp,
        email: emailEmp,
        salary: salaryEmp,
        jobStartDate: dateEmp ? dateEmp : new Date().toISOString().split('T')[0]
      }
      this.setState({
        employees,
        firstNameEmp: "",
        lastNameEmp: "",
        emailEmp: "",
        salaryEmp: "",
        jobStartDate: "",
        dateEmp: "",
        addBtnValueCond: !addBtnValueCond,
        addBtnValue: addBtnValueCond ? "x" : "+",
        edit: false,
        currentIndex: null
      })
      swal("User updated Successfully");
    e.preventDefault();
  } 
    e.preventDefault();
}
//End

  logout() {
    this.setState({
      user: false
    })
  }

  addEmployee() {
    const  {addBtnValueCond} = this.state;
    this.setState({
      addBtnValue: addBtnValueCond ? "x" : "+",
      addBtnValueCond:  !addBtnValueCond,
      firstNameEmp: "",
      lastNameEmp: "",
      emailEmp: "",
      salaryEmp: "",
      dateEmp: "",
      edit: false
    })
  }

  deleteEmployee(index) {
    const {employees} = this.state;
    employees.splice(index,1);
    this.setState({
      employees
    })
  }

  editEmployee(index) {
    const {addBtnValueCond,employees} = this.state;
    //console.log("index",employees[index]);

    this.setState({
      //get values to be edited in form
      firstNameEmp: employees[index].firstName,
      lastNameEmp: employees[index].lastName,
      emailEmp: employees[index].email,
      salaryEmp: employees[index].salary,
      dateEmp: employees[index].jobStartDate,
      //end
      currentIndex: index,
      addBtnValue: addBtnValueCond ? "x" : "+",
      addBtnValueCond: !addBtnValueCond,
      edit: true
    })
  }

  //JSX rendering functions
  renderLogin() {
    return (
      <div className="centralize mt-5">  
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Enter email" value={this.state.emailValue} onChange={ this.emailFunc.bind(this) }/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="Password" value={this.state.passValue} onChange={ this.passFunc.bind(this) } />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    );
  }

  showTable() {
    const {employees} = this.state
    return (
      <table className="table">
        <thead>
          <tr className="table-info">
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Salary</th>
            <th scope="col">Job Start Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee,index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.jobStartDate}</td>
                  <td><button onClick={this.editEmployee.bind(this,index)} className="btn btn-primary">Edit</button></td>
                  <td><button onClick={this.deleteEmployee.bind(this,index)} className="btn btn-warning">X</button></td>
                </tr>

              );
          })}
        </tbody>
      </table>
    );
  }

  addEmployeeForm() {
    const {edit} = this.state;
    return (
     <div className="centralize mt-5">  
      <form onSubmit={edit ? this.editEmpFunc.bind(this) : this.addEmpFunc.bind(this)}>
        <div className="form-group">
          <input type="text" maxLength="10" className="form-control" placeholder="First Name" value={this.state.firstNameEmp} onChange={ this.firstNameEmpFunc.bind(this) }/>
        </div>
        <div className="form-group">
          <input type="text" maxLength="10" className="form-control" placeholder="Last Name" value={this.state.lastNameEmp} onChange={ this.lastNameEmpFunc.bind(this) }/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="Email" value={this.state.emailEmp} onChange={ this.emailEmpFunc.bind(this) }/>
        </div>
        <div className="form-group">
          <input type="number" max="100000" className="form-control" placeholder="Salary" value={this.state.salaryEmp} onChange={ this.salaryEmpFunc.bind(this) }/>
        </div>
        <div className="form-group">
          <input type="date" className="form-control" placeholder="Joining Date" value={this.state.dateEmp} onChange={ this.dateEmpFunc.bind(this) }/>
        </div>
        {edit ?
        <button type="submit" className="btn btn-info">Update</button> :
        <button type="submit" className="btn btn-primary">Submit</button>}
      </form>
    </div>
    );
  }


  render() {
    const {user,addBtnValueCond} = this.state
    return (
     <div>
     <h2 className="App mt-2">Employees Record</h2>
     {!user ?
     <div> 
     <button className="btn btn-dark offset-md-11 mb-4" onClick={_ => this.logout()}>Logout</button>    
      {addBtnValueCond ? this.showTable() : this.addEmployeeForm()}  
     <input type="button" className="btn btn-lg btn-danger add-btn" value={this.state.addBtnValue} onClick={_ => this.addEmployee()}/> 
     </div> :
      this.renderLogin()}
    </div>
    );
  }
}

export default App;
