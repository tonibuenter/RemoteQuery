--
-- INIT 01 TESTS
--


--
-- SERVICE_ID = Test.Command.set
--

put name = hello
;
select "VALUE" from JGROUND.T_APP_PROPERTIES where NAME = :name



--
-- SERVICE_ID = Test.Command.copy
--

put name = hello
;
put name2 = hello2
;
copy name1 = name
;
copy-if-empty name2 = name


--
-- SERVICE_ID = Test.Command.if
--

parameters select VALUE as "DOES_EXIST" from JGROUND.T_APP_PROPERTIES where NAME = :name
;
if doesExist
  ;
	select 'true' as "VALUE" from JGROUND.T_APP_PROPERTIES
	;
	select 'true' as "VALUE" from JGROUND.T_APP_PROPERTIES
	;
  else
	;
	select 'false' as "VALUE" from JGROUND.T_APP_PROPERTIES
	;
end



--
-- SERVICE_ID = Test.Command.if_elseOnly
--

put elseValue = not reached else
;
if condition1
  ;
  else
  ;
  put elseValue = true
  ;
end






--
-- SERVICE_ID = Test.Command.switch
--

delete from JGROUND.T_APP_PROPERTIES where NAME like 'Test.Command.switch%'
;
parameters:select 'A12' as "SWITCH_VALUE" from JGROUND.T_DUAL
;
switch:switchValue;
  case:A12;
  case:A13;
  case:A14;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values ('Test.Command.switch-1', 'ok');
  break;
  
  case:A13;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values ('Test.Command.switch-2', 'ok');
  break;
  
  case:A14;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values ('Test.Command.switch-3', 'ok');
  break;
  
  case:A12;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values ('Test.Command.switch-4', 'ok');
end;
;
select * from JGROUND.T_APP_PROPERTIES where NAME like 'Test.Command.switch%'
;
parameters:select count(*) as "TOTAL1" from JGROUND.T_APP_PROPERTIES where NAME like 'Test.Command.switch%'
;;
delete from JGROUND.T_APP_PROPERTIES where NAME like 'Test.Command.switch%'
;



--
-- SERVICE_ID = Test.Command.switch_empty
--

set:prefix=Test.Command.switch_empty%
;
delete from JGROUND.T_APP_PROPERTIES where NAME like :prefix
;
set:switchValue=ABC
;
set:switchValue=
;
switch:switchValue;
  case:A12;
  case:;
  case:A14;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:prefix || '1', 'ok');
  break;
  
  case:;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:prefix || '2', 'ok');
  break;
  
  case:A14;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:prefix || '3', 'ok');
end;
;
select * from JGROUND.T_APP_PROPERTIES where NAME like :prefix
;
parameters:select count(*) as "TOTAL1" from JGROUND.T_APP_PROPERTIES where NAME like 'Test.Command.switch%'
;
delete from JGROUND.T_APP_PROPERTIES where NAME like :prefix
;



--
-- SERVICE_ID = Test.Command.switch_default
--

set:prefix=Test.Command.switch_default%
;
delete from JGROUND.T_APP_PROPERTIES where NAME like :prefix
;
set:switchValue=ABC
;
set:switchValue=NOMATCH
;
switch:switchValue;
  case:A12;
  case:;
  case:A14;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:prefix || '1', 'ok');
  break;
  
  default:;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:prefix || '2', 'ok');
  break;
  
  case:A14;
    insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:prefix || '3', 'ok');
end;
;
select * from JGROUND.T_APP_PROPERTIES where NAME like :prefix
;
parameters:select count(*) as "TOTAL1" from JGROUND.T_APP_PROPERTIES where NAME like 'Test.Command.switch%'
;
delete from JGROUND.T_APP_PROPERTIES where NAME like :prefix
;



--
-- SERVICE_ID = Test.Command.backslash
-- 

set semicolon = \;
;
insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE) values ('semicolon', :semicolon)
;
parameters
  select VALUE as "IS_TRUE" from JGROUND.T_APP_PROPERTIES where VALUE = '\;' and NAME = 'semicolon'
;
if isTrue
;
  set semicolon = ok
;
end



--
-- SERVICE_ID = Test.Command.example
-- ROLES      = APP_ADMIN
--

set name = hello
;
select VALUE from JGROUND.T_APP_PROPERTIES where NAME = :name



--
-- SERVICE_ID = Test.Command.serviceid
-- ROLES      = APP_ADMIN
--

serviceId Test.Command.example


--
-- SERVICE_ID = Test.Command.extension_CreateNewUser
-- 

create-new-user John Smith




--
-- SERVICE_ID = Test.Command.foreach
--

parameters 
  select count(*) as "TOTAL1" from JGROUND.T_APP_PROPERTIES 
;
foreach 
  select NAME, VALUE from JGROUND.T_APP_PROPERTIES 
  ;
  insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:name || '-2', :value)
  ;
end
;
select * from JGROUND.T_APP_PROPERTIES 
;
parameters
  select count(*) as "TOTAL2" from JGROUND.T_APP_PROPERTIES 

  
  

--
-- SERVICE_ID = Test.Command.while
--

insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE) values ('while-1', '1');
insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE) values ('while-2', '2');
insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE) values ('while-3', '3');
set whileName = start;
while whileName;
  delete from JGROUND.T_APP_PROPERTIES where NAME = :whileName;
  parameters select NAME as "WHILE_NAME" from JGROUND.T_APP_PROPERTIES where NAME like 'while%';
end;
select * from JGROUND.T_APP_PROPERTIES where NAME like 'while%'
  