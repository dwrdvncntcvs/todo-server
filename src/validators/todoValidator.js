const { Validation } = require("../utils/validation");

class ValidateToDo {
  state = null;

  constructor({
    body = null,
    checkedId = null,
    foundTask = 0,
    tasks = null,
    foundSubTask = 0,
  }) {
    this.checkInputIfNotEmpty(body);
    this.isIdValid(checkedId);
    this.checkIfTaskExist(foundTask);
    this.checkTaskOfUserIfExist(tasks);
    this.checkIfFoundSubTaskExist(foundSubTask);
  }

  checkInputIfNotEmpty(body) {
    if (body !== null)
      Object.keys(body).forEach((key) => {
        if (body[key] === "" || body[key] === null)
          this.state = new Validation(403, "Inputs must be specified");
      });
  }

  isIdValid = (checkedId) => {
    if (checkedId !== null)
      if (checkedId === false && this.state == null)
        this.state = new Validation(404, "ID is not valid");
  };

  checkIfTaskExist = (foundTask) => {
    if (foundTask !== 0) {
      if (foundTask === null)
        this.state = new Validation(404, "Task not found");
    }
  };

  checkTaskOfUserIfExist = (tasks) => {
    if (tasks !== null)
      if (tasks.length === 0) this.state = new Validation(404, "No task found");
  };

  checkIfFoundSubTaskExist = (foundSubTask) => {
    if (foundSubTask !== 0)
      if (!foundSubTask) this.state = new Validation(404, "Sub Task not found");
  };
}

module.exports.ValidateToDo = ValidateToDo;
