USE employees_db;

INSERT INTO department (dept_name )
VALUE ("Marketing"), ("Accounting"), ("Sales"), ("Human Resources"), ("Research and Development"), ("Engineering");

INSERT INTO roles (title, salary, department_id)
VALUE ("Salesperson", 50000.00, 3), 
("Sales Lead", 70000.00, 3),
 ("Lead Engineer", 120000.00, 6),
  ("Software Engineer", 130000.00, 6), 
  ("Accountant", 100000.00, 2), 
  ("Lawyer", 200000.00, 4), 
  ("Legal Team Lead", 130000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Bobby", "Johnson", 1, 3 ),
 ("Chad", "Tarpey", 3, null ), 
 ("Peter", "Parker", 2, null), 
 ("Bruce", "Wayne", 4, 3), 
 ("Michael", "Jordan", 5, 6), 
 ("Jessica", "Bowman", 6, null);

 