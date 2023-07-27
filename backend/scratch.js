-- CREATE DATABASE `class_test`;

-- drop database `class_test`;

-- drop table customers1;


-- classicmodels.customers definition
-- CREATE TABLE `table_name` ( <row_name data_type NOT NULL>);
-- CREATE TABLE `customers1` (
  `customerNumber` int(11) NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `contactLastName` varchar(50) NOT NULL,
  `contactFirstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `salesRepEmployeeNumber` int(11) DEFAULT NULL,
  `creditLimit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`customerNumber`)
);


-- create table `customers2` ( `id` int(10) not null);


-- =========================================
-- SELECT * FROM table_name

select *, c.customerNumber from customers c;
select cust.customerNumber, cust.contactLastName from customers cust;

-- distinct;
select distinct c.contactLastName from customers c;
select * from employees e;
select distinct extension from employees e;	

-- where clause
select * from customers c;
select * from customers c where state = 'CA';
-- Numeric =, >, >=, <, <=, <>, BETWEEN, LIKE, IN, String/Text  = 'CA', LIKE '%CA%'
select * from customers c where customerNumber <> 112; 
select * from customers c where customerNumber between 100 and 150;
select * from customers c where customerName like '%Store%';
select * from customers c where customerNumber in (124, 127, 320);
select * from customers c where customerName in ('%Store%', '%Mini%', '%Signal Gift Stores');

-- AND, OR, NOT
select * from customers c where (customerNumber > 120) and (customerName like '%Storex%');
select distinct p.productLine from products p; 
select * from products p where p.productLine = 'Ships' or p.quantityInStock > 1000;
select * from products p where not p.productLine = 'Ships' or p.quantityInStock > 1000;

-- order by
select distinct p.productLine from products p order by p.productLine desc; 

-- select top * or bottom *
select 
	p.productLine as pline,
	p.productName,
	p.productCode,
	p.quantityInStock
from products p 
where p.productLine = 'Ships' 
	or p.quantityInStock > 1000 
order by p.quantityInStock asc -- desc
limit 5;

-- min, max, avg, count, sum
select min(p.quantityInStock) as minStock, max(p.quantityInStock) as maxStock from products p;
select * from products p where p.quantityInStock = 15;
select avg(p.MSRP), count(*), sum(p.MSRP)  from products p where p.buyPrice between 50 and 100;

--- JOINS;

select * 
from orderdetails o 
inner join products p on o.productCode = p.productCode
-- where o.orderNumber = 10100 ;

select * from orderdetails o where o.orderNumber = 10100;

-- LEFT JOIN, 
-- customers e 
-- orders o 
select * from customers c;
select * from orders o; 

select * from customers c 
left join orders o  on c.customerNumber = o.customerNumber;

select * from orders o 
left join customers c on c.customerNumber  = o.customerNumber;

select * from customers c 
full join orders o  on c.customerNumber = o.customerNumber;

-- union
(select * from customers c  where country = 'USA'
UNION
select * from customers c where country = 'UK'
union
select * from customers c where country = 'France')
order by  country;

-- alternatively using IN
select * from customers c where country in ('USA', 'UK', 'France') order by country;
select * from customers c where country = 'USA' or country = 'U%' or country = '%an%';
-- 

-- group by
select 
	country, 
	count(customerName) as `count`, 
	max(creditLimit) as maxCredit 
from customers c 
group by country  
having count(customerName) > 10
order by country asc;

-- exists
select country from customers c where exists (select distinct(country) from customers c2 where country like '%e%');