USE employee_db;

INSERT INTO department(name)
VALUES 	("Sales"),
		("IT"),
		("HR"),
		("Legal");
    
INSERT INTO role (title, salary, department_id)
VALUES	("Sales Manager", 130000, 1),
		("Engineer", 200000, 2),
		("HR Specialist", 75000, 3),
		("Legal Director", 250000, 4);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES	("Valeryo", "Haim", 1, 1),
		("Jeff", "Base", 2, 2),
		("William", "Gates", 3, 3),
		("Stephen", "Yobs", 4, 4);
		