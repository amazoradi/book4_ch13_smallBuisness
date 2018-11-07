// fetching all of hte data from each object in our database
const empSearch = fetch("http://localhost:8088/employees")
  .then(Data => Data.json())

const deptSearch = fetch("http://localhost:8088/departments")
  .then(data => data.json())

const compSearch = fetch("http://localhost:8088/computers")
  .then(data => data.json())

  // collecting all promises so we know all calls are done at the same time 
Promise.all([empSearch, deptSearch, compSearch])
  .then(allData => {
    const allEmployees = allData[0]
    const allDepartments = allData[1]
    const allComputers = allData[2]
    allEmployees.forEach(employee => {
      let employCard = {
        "name": employee.name,
        "department": allDepartments.find((dept) => dept.id === employee.departmentID),
        "computer": allComputers.find((comp) => comp.id === employee.computerID)
      }

      let card = new Employee(employCard)
      let div = document.createElement("div")
      div.innerHTML = card.createCardText()
      document.querySelector("#ourEmployees").appendChild(div)
    })
  });



  // employee class that can take employee info

class Employee {
  constructor(props) {
    this.name = props.name
    this.department = props.department
    this.computer = props.computer
  }

  // method that will return a html "card" with the employee info
  createCardText() {
    return ` <article class="employee">
    <header class="employee__name">
      <h1>${this.name}</h1>
    </header>
    <section class="employee__department">
      Works in the ${this.department.name} department located in the ${this.department.location}.
    </section>
    <section class="employee__computer">
      Currently using a ${this.computer.year} ${this.computer.name}
    </section>
</article>`
  }

}




