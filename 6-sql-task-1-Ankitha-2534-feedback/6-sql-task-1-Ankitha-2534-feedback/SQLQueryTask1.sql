USE AnkithaDB;

create table Employee(
EmployeeId VarChar(7) Primary Key,
FirstName VarChar(15),
LastName VarChar(15),
Title VarChar(15),
Age Int,
Salary Float
);

insert into Employee(EmployeeId,FirstName,LastName,Title,Age,Salary) values
(1,'Harry','Porter','Fresher',20,43000),
(2,'John','Abraham','Programer',27,23000),
(3,'Sujika','Williams','General Manager',37,50000),
(4,'Nobitha','Nobi','Fresher',25,23000),
(5,'ShinChan','Nohara','Programer',45,70000),
(6,'Kasama','Nenichan','General Manager',40,60000),
(7,'Nainy','Chan','Programer',30,50000)
;

select * from Employee;

select FirstName,LastName,Title,Age,Salary from Employee;

select FirstName,Age,Salary from Employee;

select FirstName AS Name from Employee;

select CONCAT(FirstName,' ',LastName) AS Name from Employee;

select * from Employee where Salary>38000;

select FirstName,LastName from Employee where Age<24;

select FirstName,LastName,Salary from Employee where Title='Programer';

select * from Employee where LastName Like '%o%';

insert into Employee(EmployeeId,FirstName,LastName,Title,Age,Salary) values
(8,'Kelly','Jian','Fresher',20,43000),
(9,'Jaico','Moore','Programer',27,23000),
(10,'Sunio','Moore','General Manager',37,50000);

select * from Employee;

select LastName from Employee where FirstName='Kelly';

select * from Employee where LastName='Moore';

select *from Employee where LastName Like '%Moore';

select * from Employee where Age>=35;

select * from Employee where Age>24 and Age<43;

select * from Employee where (Age>28 and Age<62) and Salary>31250;

select * from Employee where Age<48 and Salary>21520;

select FirstName, Age from Employee where (FirstName Like 'John%') and (Salary> 25000 and Salary<35000);

update Employee set Salary=27000 where FirstName='John';

select * from Employee Order by Age DESC;

select * from Employee Order by Age ASC;

select * from Employee Order by Salary DESC;

select * from Employee Order by Salary ASC;

select * from Employee where Age>17 Order by Salary ASC;

select * from Employee where Age<34 Order by Salary DESC;

select * from Employee Order by Len(FirstName) ASC;

select count(FirstName) from Employee where Age>45;

update Employee set Age=Age+5, Salary=Salary-250;
select * from Employee;

select count(FirstName) from Employee where LastName Like '%re' or LastName Like '%ri' or LastName Like '%ks';

select Avg(Salary) from Employee;

select Avg(Salary) from Employee where Title='Fresher';

select Avg(Salary) from Employee where Title='Programer';

select Avg(Salary) from Employee where Age>35 and Age<50;

select count(FirstName) from Employee where Title='Fresher';

select (count(Case When Title='Programer' then FirstName End)*100)/count(*) from Employee; 

select sum(Salary) from Employee where Age>=40;
select * from Employee;

select sum(Salary) from Employee where Title='Fresher' or Title='Programer';

select sum(Salary)*36 from Employee where Title='Fresher' and Age>27;

select FirstName,LastName,Age from Employee where Salary<35000 and Age=(select max(Age) from Employee where Salary<35000);

select * from Employee where Title='General Manager' and Age=(Select Min(Age) from Employee where Title='General Manager');

select * from Employee where Title='Fresher' and salary<35000 and Age=(select Max(Age) from Employee where Title='Fresher' and salary<35000);

select FirstName,Age from Employee where (Firstname Like 'John%' or Firstname Like 'Michael%') and Salary Between 17000 and 26000;

select count(*) from Employee Group by Title Order by count(*) ASC;

select Avg(Salary) from Employee Group by Title;

select Avg(Salary) from Employee where Title!='Fresher' Group by Title;

select Avg(Age) from Employee Group by Title;

select count(*) from Employee where Age>25 and Age<40 Group by Title;
select * from Employee;

select Avg(Salary) from Employee Group by Title Having Avg(Salary)>25000;

select Sum(Age) from Employee Group by Title Having Sum(Age)>30;

update Employee set LastName='Michael' where FirstName='Jaico';

update Employee set Age=Age+1, Salary=Salary+5000 where FirstName='Jaico';

update Employee set Title='Engineer' where Title='Programer';

update Employee set Salary=Salary+3500 where Salary<30000;

update Employee set Salary=Salary-((Salary*15)/100) where Salary>35500;
select * from Employee;


