create DataBase AnkithaTask2;

--1
select Employee.FirstName,Employee.LastName from Employee Join Orders on Employee.EmployeeID=Orders.EmployeeID where OrderDate>='1996-08-15' and OrderDate<='1997-08-15';

--2
select Distinct Employee.EmployeeID from Employee Join Orders on Employee.EmployeeID=Orders.EmployeeID where OrderDate<'1996-10-16';

--3
select count(Products.ProductName) from Products Join OrderDetails on Products.ProductID=OrderDetails.ProductID Join Orders on Orders.OrderID=OrderDetails.OrderID where OrderDate>='1997-01-13' and OrderDate<='1997-04-16';

--4
select count(Orders.EmployeeID) from Orders Join Employee on Orders.EmployeeID=Employee.EmployeeID where FirstName='Anne' and LastName='Dodsworth' and OrderDate>='1997-01-13' and OrderDate<='1997-04-16';
select * from Products;

--5
select count(Orders.OrderID) from Orders Join Employee on Orders.EmployeeID=Employee.EmployeeID where FirstName='Robert' and LastName='King';

--6
select count(Orders.OrderID) from Orders Join Employee on Orders.EmployeeID=Employee.EmployeeID where FirstName='Robert' and LastName='King' and Orders.OrderDate Between '1996-08-15' and '1997-08-15';

--7
select Employee.EmployeeID,CONCAT(Employee.FirstName,' ',Employee.LastName) As EmployeeFullName,Employee.HomePhone from Employee Join Orders on Orders.EmployeeID=Employee.EmployeeID where OrderDate>='1997-01-13' and OrderDate<='1997-04-16';

--8
select Top 1 Products.ProductID,ProductName,count(OrderDetails.OrderID) from Products Join OrderDetails on Products.ProductID=OrderDetails.ProductID Group by Products.ProductID,ProductName order by count(OrderDetails.OrderID) DESC;

--9
select Top 5 Products.ProductName,count(Shippers.ShipperID) as shipped from Products Join OrderDetails on OrderDetails.ProductID=Products.ProductID Join Orders on Orders.OrderID=OrderDetails.OrderID Join Shippers on Orders.ShipperID=Shippers.ShipperID Group by Products.ProductName order by shipped;

--10
select sum(OrderDetails.UnitPrice) from OrderDetails Join Orders on Orders.OrderID=OrderDetails.OrderID Join Employee on Orders.EmployeeID=Employee.EmployeeID where FirstName='Laura' and LastName='Callahan' and OrderDate='1997-01-13' Group by FirstName,LastName;

--11
select count(Distinct Employee.EmployeeID) from Employee Join Orders on Orders.EmployeeID=Employee.EmployeeID Join OrderDetails on OrderDetails.OrderID=Orders.OrderID Join Products on Products.ProductID=OrderDetails.ProductID where (ProductName='Gorgonzola Telino' or ProductName='Gnocchi di nonna Alice' or ProductName='Raclette Courdavault' or ProductName='Camembert Pierrot') and Orders.OrderDate>='1997-01-01' and Orders.OrderDate<='1997-01-31'; 

--12
select CONCAT(FirstName,' ',LastName) from Employee Join Orders on Orders.EmployeeID=Employee.EmployeeID Join OrderDetails on OrderDetails.OrderID=Orders.OrderID Join Products on Products.ProductID=OrderDetails.ProductID where ProductName='Tofu' and Orders.OrderDate>='1997-01-13' and Orders.OrderDate<='1997-01-30';

--13
/*select Employee.EmployeeID,Employee.BirthDate,Concat(FirstName,' ',LastName),
concat(Year(GetDate())-Year(Employee.BirthDate),' Years ',
(Case 
when Month(GetDate())>Month(Employee.BirthDate) then Month(GetDate())-Month(Employee.BirthDate)
Else 12-Month(Employee.BirthDate)+Month(GetDate())
End),' Months ',
(Case 
when Day(GetDate())>Day(Employee.BirthDate) then Day(GetDate())-Day(Employee.BirthDate)
Else Day(GetDate())
End),' Days')
AS Age from Employee Join Orders on Orders.EmployeeID=Employee.EmployeeID where Month(Orders.OrderDate)='08';*/

select Employee.EmployeeID,Employee.BirthDate,Concat(FirstName,' ',LastName),Year(GetDate())-Year(Employee.BirthDate) AS BirthInYear,((Year(GetDate())-Year(Employee.BirthDate))*12) As BirthInMonth,((Year(GetDate())-Year(Employee.BirthDate))*365) As BirthInDays from Employee;
--
select count(Shippers.ShipperID) As shipped from Shippers Join Orders on Orders.ShipperID=Shippers.ShipperID Order by shipped ASC;

--
select Orders.ShipName,count(Orders.ShipperID) from Orders Group by ShipName;

--14
select Shippers.CompanyName,count(Orders.OrderID) from Orders Join Shippers on Shippers.ShipperID=Orders.ShipperID Group by CompanyName;

--15
select Shippers.CompanyName,count(Products.ProductID) from Shippers Join Orders on Shippers.ShipperID=Orders.ShipperID Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on OrderDetails.ProductID=Products.ProductID Group by CompanyName;

--16
select Top 1 Shippers.ShipperID,Shippers.CompanyName,count(Orders.OrderID) from Orders Join Shippers on Shippers.ShipperID=Orders.ShipperID Group by CompanyName,Shippers.ShipperID order by count(Orders.OrderID) DESC;

--17
select Top 1 Shippers.CompanyName,count(*) from Shippers Join Orders on Shippers.ShipperID=Orders.ShipperID Join OrderDetails on Orders.OrderID=OrderDetails.OrderID where Orders.ShippedDate>='1996-08-10' and Orders.ShippedDate<='1998-09-20' Group by CompanyName;

--18
select Distinct CONCAT(FirstName,' ',LastName) from Employee Join Orders on Employee.EmployeeID!=Orders.EmployeeID where Orders.OrderDate='1997-04-04';

--19
select count(Products.ProductID) As ShippedProducts from Shippers Join Orders on Shippers.ShipperID=Orders.ShipperID Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on OrderDetails.ProductID=Products.ProductID Join Employee on Employee.EmployeeID=Orders.EmployeeID where Employee.FirstName='Steven' and LastName='Buchanan';

--20
select count(Orders.OrderID) from Orders Join Shippers on Shippers.ShipperID=Orders.ShipperID Join Employee on Employee.EmployeeID=Orders.EmployeeID where Employee.FirstName='Michael' and Employee.LastName='Suyama' and Shippers.CompanyName='Federal Shipping';

--21
select count(Orders.OrderID) from Orders Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on OrderDetails.ProductID=Products.ProductID Join Suppliers on Suppliers.SupplierID=Products.SupplierID where Suppliers.Country='UK' or Suppliers.Country='Germany';

--22
select * from Suppliers;
select OrderDetails.Quantity from OrderDetails Join Products on Products.ProductID=OrderDetails.ProductID Join Suppliers on Products.SupplierID=Suppliers.SupplierID Join Orders on Orders.OrderID=OrderDetails.OrderID where Suppliers.CompanyName='Exotic Liquids' and OrderDate Between '1997-01-01' and '1997-01-31';

--23
--select Orders.ShippedDate,Suppliers.CompanyName from Orders Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on Products.ProductID=OrderDetails.ProductID Join Suppliers on Products.SupplierID=Suppliers.SupplierID where Suppliers.CompanyName='Tokyo Traders' and Year(Orders.ShippedDate)='1997' and Month(Orders.ShippedDate)='01' and Day(Orders.ShippedDate)  Between '01' and '31';
--select Orders.ShippedDate from Orders
select Distinct Orders.OrderDate from Orders Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on Products.ProductID=OrderDetails.ProductID Join Suppliers on Products.SupplierID=Suppliers.SupplierID where Suppliers.CompanyName!='Tokyo Traders' and Year(Orders.OrderDate)='1997' and Month(Orders.OrderDate)='01';


--24
select Distinct Employee.EmployeeID,Employee.FirstName from Employee where Employee.EmployeeID Not In (select Orders.EmployeeID from Orders Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on OrderDetails.ProductID=Products.ProductID Join Suppliers on Products.SupplierID=Suppliers.SupplierID where Suppliers.CompanyName='Ma Maison' and Month(Orders.OrderDate)='05');
Select * from Employee;

--25
select Distinct ShipName from Orders;
select Distinct CompanyName from Shippers;
select Top 1 Shippers.CompanyName,count(OrderDetails.ProductID) from Shippers Join Orders on Orders.ShipperID=Shippers.ShipperID Join OrderDetails on OrderDetails.OrderID=Orders.OrderID Join Products on Products.ProductID=OrderDetails.ProductID where (Month(Orders.ShippedDate)='09' or Month(Orders.ShippedDate)='10') and Year(Orders.ShippedDate)='1997' Group by Shippers.CompanyName;

--26
select Distinct Products.ProductName,Orders.ShippedDate from Products 
Join OrderDetails on OrderDetails.ProductID=Products.ProductID 
Join Orders on Orders.OrderID=OrderDetails.OrderID  
where Year(Orders.ShippedDate)='1997' and Month(Orders.ShippedDate)!='08';
select * from products;

select Shippers.ShipperID,Orders.ShipperID from Shippers Join Orders on Shippers.ShipperID=Orders.ShipperID;

--27
select Distinct Products.ProductName,Employee.FirstName from Products Join OrderDetails on OrderDetails.ProductID=Products.ProductID Join Orders on Orders.OrderID=OrderDetails.OrderID cross Join Employee ;
select ProductName from Products;

--28
select Top 1 Shippers.CompanyName,count(*) from Shippers Join Orders on Orders.ShipperID=Shippers.ShipperID  where (Year(Orders.ShippedDate)='1996' or Year(Orders.ShippedDate)='1997') and (Month(Orders.ShippedDate)='04' or Month(Orders.ShippedDate)='05' or Month(Orders.ShippedDate)='06') Group by Shippers.CompanyName order by count(*) DESC;

--29
select Top 1 Suppliers.Country,count(Products.ProductName) from Suppliers Join Products on Products.SupplierID=Suppliers.SupplierID Join OrderDetails on OrderDetails.ProductID=Products.ProductID Join Orders on Orders.OrderID=OrderDetails.OrderID where Year(Orders.ShippedDate)='1997' Group by Suppliers.Country order by Count(Products.ProductName) DESC;

--30
select AVG(DATEDIFF(day,OrderDate,ShippedDate)) from Orders where ShippedDate Is not null;

--31
select top 1 Shippers.CompanyName,MIN(DATEDIFF(day,OrderDate,ShippedDate)) AS NumberOfDays from Orders Join Shippers on Orders.ShipperID=Shippers.ShipperID where ShippedDate Is not null Group by Shippers.CompanyName order by NumberOfDays ASC;

--32
select Top 1 Orders.OrderID,DATEDIFF(day,Orders.OrderDate,Orders.ShippedDate) As NoOfDays,Shippers.CompanyName,Concat(Employee.FirstName,' ',Employee.LastName) As FullName,Count(Products.ProductName) from Orders Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on Products.ProductID=OrderDetails.ProductID Join Shippers on Shippers.ShipperID=Orders.ShipperID Join Employee on Employee.EmployeeID=Orders.EmployeeID 
where Orders.ShippedDate Is Not Null Group by Orders.OrderID,Orders.OrderDate,Orders.ShippedDate,Shippers.CompanyName,Employee.FirstName,Employee.LastName order by NoOfDays ASC;

-----unions

--1
select '1' As Label,
Orders.OrderID,Min(DATEDIFF(day,Orders.OrderDate,Orders.ShippedDate)) As NoOfDays,
Shippers.CompanyName,Concat(Employee.FirstName,' ',Employee.LastName) As FullName,
Count(Products.ProductName) As NoOfProducts from Orders 
Join OrderDetails on Orders.OrderID=OrderDetails.OrderID 
Join Products on Products.ProductID=OrderDetails.ProductID 
Join Shippers on Shippers.ShipperID=Orders.ShipperID 
Join Employee on Employee.EmployeeID=Orders.EmployeeID 
where Orders.ShippedDate Is Not Null 
Group by Orders.OrderID,Orders.OrderDate,Orders.ShippedDate,Shippers.CompanyName,Employee.FirstName,Employee.LastName
HAVING DATEDIFF(day, Orders.OrderDate, Orders.ShippedDate) = (SELECT MIN(DATEDIFF(day, OrderDate, ShippedDate))FROM Orders
    WHERE ShippedDate IS NOT NULL
Union
select '2' As Label,Orders.OrderID,Max(DATEDIFF(day,Orders.OrderDate,Orders.ShippedDate)) As NoOfDays,Shippers.CompanyName,Concat(Employee.FirstName,' ',Employee.LastName) As FullName,Count(Products.ProductName) As NoOfProducts from Orders Join OrderDetails on Orders.OrderID=OrderDetails.OrderID Join Products on Products.ProductID=OrderDetails.ProductID Join Shippers on Shippers.ShipperID=Orders.ShipperID Join Employee on Employee.EmployeeID=Orders.EmployeeID 
where Orders.ShippedDate Is Not Null 
Group by Orders.OrderID,Orders.OrderDate,Orders.ShippedDate,Shippers.CompanyName,Employee.FirstName,Employee.LastName 
Order by NoOfDays ASC;


SELECT '1' AS Label,
       Orders.OrderID,
       DATEDIFF(day, Orders.OrderDate, Orders.ShippedDate) AS NoOfDays,
       Shippers.CompanyName,
       CONCAT(Employee.FirstName, ' ', Employee.LastName) AS FullName,
       COUNT(Products.ProductName) AS NoOfProducts
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON Products.ProductID = OrderDetails.ProductID
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
JOIN Employee ON Employee.EmployeeID = Orders.EmployeeID
WHERE Orders.ShippedDate IS NOT NULL
GROUP BY Orders.OrderID, Orders.OrderDate, Orders.ShippedDate, Shippers.CompanyName, Employee.FirstName, Employee.LastName
HAVING DATEDIFF(day, Orders.OrderDate, Orders.ShippedDate) = (
    SELECT MIN(DATEDIFF(day, OrderDate, ShippedDate))
    FROM Orders
    WHERE ShippedDate IS NOT NULL
)
UNION
SELECT '2' AS Label,
       Orders.OrderID,
       DATEDIFF(day, Orders.OrderDate, Orders.ShippedDate) AS NoOfDays,
       Shippers.CompanyName,
       CONCAT(Employee.FirstName, ' ', Employee.LastName) AS FullName,
       COUNT(Products.ProductName) AS NoOfProducts
FROM Orders
JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
JOIN Products ON Products.ProductID = OrderDetails.ProductID
JOIN Shippers ON Shippers.ShipperID = Orders.ShipperID
JOIN Employee ON Employee.EmployeeID = Orders.EmployeeID
WHERE Orders.ShippedDate IS NOT NULL
GROUP BY Orders.OrderID, Orders.OrderDate, Orders.ShippedDate, Shippers.CompanyName, Employee.FirstName, Employee.LastName
HAVING DATEDIFF(day, Orders.OrderDate, Orders.ShippedDate) = (
    SELECT MAX(DATEDIFF(day, OrderDate, ShippedDate))
    FROM Orders
    WHERE ShippedDate IS NOT NULL
)
ORDER BY NoOfDays ASC;


--2
Select ProductID, ProductName, UnitPrice, 1 AS ProductLabel from (Select Top 1 Products.ProductID, Products.ProductName, Products.UnitPrice from Products Join OrderDetails On OrderDetails.ProductID = Products.ProductID Join Orders On OrderDetails.OrderID = Orders.OrderID Where YEAR(OrderDate) = '1997' and MONTH(OrderDate) = '10' and OrderDate Between '1997-10-07' and '1997-10-14' ORDER BY Products.UnitPrice ASC) AS CheapestProduct
UNION
Select ProductID, ProductName, UnitPrice, 2 AS ProductLabel from (Select Top 1 Products.ProductID, Products.ProductName, Products.UnitPrice from Products Join OrderDetails On OrderDetails.ProductID= Products.ProductID Join Orders On OrderDetails.OrderID = Orders.OrderID Where YEAR(OrderDate) = '1997' and MONTH(OrderDate) = '10' and OrderDate Between '1997-10-07' and '1997-10-14'  ORDER BY Products.UnitPrice DESC) AS CostliestProduct
ORDER BY ProductLabel;

--select DATEPART(week, DATEFROMPARTS(YEAR(OrderDate), 10, 2)),DATEPART(WEEK, OrderDate),* from Orders Where YEAR(OrderDate) = '1997' and MONTH(OrderDate) = '10' and DATEPART(WEEK, OrderDate) = 2 
----case
Select Distinct Employee.EmployeeID,Orders.ShipperID,
Case 
When Orders.ShipperID = 2 Then 'Express Speedy'
When Orders.ShipperID = 3 Then 'United Package'
When Orders.ShipperID = 1 Then 'Shipping Federal'
Else Orders.ShipName
End AS ShipperName
From Orders Join Employee On Orders.EmployeeID = Employee.EmployeeID Where Employee.EmployeeID IN (1, 3, 5, 7);
