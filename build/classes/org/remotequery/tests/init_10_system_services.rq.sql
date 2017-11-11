--
-- INIT 1 SYSTEM SERVICES
--


--
-- SERVICE_ID = RQService.select
--

select * from JGROUND.T_RQ_SERVICE where SERVICE_ID like :serviceIdFilter



--
-- SERVICE_ID = RQService.get
-- 

select * from JGROUND.T_RQ_SERVICE where SERVICE_ID = :serviceId



--
-- SERVICE_ID = RQService.delete
-- ROLES      = SYSTEM,APP_ADMIN
--

delete from JGROUND.T_RQ_SERVICE where SERVICE_ID = :serviceId



-- **************
-- APP PROPERTIES
-- **************


--
-- SERVICE_ID = AppProperties.insert
-- ROLES      = SYSTEM,APP_ADMIN
--

insert into JGROUND.T_APP_PROPERTIES
(NAME, VALUE)
values
(:name, :value)



--
-- SERVICE_ID = AppProperties.get
-- ROLES      = SYSTEM,APP_ADMIN
--

select * from JGROUND.T_APP_PROPERTIES
where NAME = :name



--
-- SERVICE_ID = AppProperties.update
-- ROLES      = SYSTEM,APP_ADMIN
--

update JGROUND.T_APP_PROPERTIES
set VALUE = :value
where NAME = :name


--
-- SERVICE_ID = AppProperties.deleteAll
-- ROLES      = SYSTEM,APP_ADMIN
--

delete from JGROUND.T_APP_PROPERTIES
