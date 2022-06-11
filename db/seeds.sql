INSERT INTO department(name)
VALUES('Sales'),
VALUES('Engineering'),
VALUES('Finance'),
VALUES('Legal');


INSERT INTO role (title, salary, department_id)
VALUES('Sales Lead', 100000, 1),
VALUES('Salesperson',  80000, 1),
VALUES('Lead Engineer', 150000, 2),
VALUES('Software Engineer', 120000, 2),
VALUES('Account Manager', 160000, 3),
VALUES('Accountant', 125000, 3),
VALUES('Legal Team Lead',  250000, 4);
VALUES('Lawyer',  190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('John', 'Doe', 1, NULL),
VALUES('Mike', 'Chan', 2, 1),
VALUES('Ashely', 'Rodriguez', 3, NULL),
VALUES('Kevin', 'Tupik', 4, 3),
VALUES('Kunal', 'Singh', 5, NULL),
VALUES('Malia', 'Brown', 6, 5),
VALUES('Sarah', 'Lourd', 7, NULL),
VALUES('Tom', 'Allen', 8, 7);