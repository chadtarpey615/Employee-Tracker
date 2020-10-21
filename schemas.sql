DROP DATABASE IF EXISTS employess_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABlE employee (
    id INT NOT NULL AUTO_INCREMENT,
    fisrt_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager-id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABlE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN key (department_id) REFERENCES department(id)
);

CREATE TABlE department (
    id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(30),
    PRIMARY KEY (id) 

);