# RemoteQuery Reference Manual


## Commands Statement Syntax

The command statement syntax is:

```
command {white-space, : } parameter part ;

```





## Commands (build-in)

Command | Usage| Description
--- | --- | ---
*set*  | set hello = world | This sets 'value' to the request parameter 'name'
*put* | put hello = world | The same as with *set*
```set-if-empty```  | set-if-empty name = value | As if set but only if the current value of 'name' *set-if-empty* *put-if-empty* | put-if-empty name = value | The same as with *set-if-empty*
*copy*  | copy name1 = name2 | set the value of name2 to value of name1
*copy-if-empty*  | copy-if-empty name1 = name2 | Like copy, but only if value of name1 is empty
*parameters*  | parameters select * from T_ADDRESS ... | The parameter part is processed as statements and the result, actually the first row if available, is applied to the parameters.
*parameters-if-empty*  |   | The same as with *parameters* but only for parameters that are empty

### Command *serviceId* 

The *serviceId* expects another serviceId. The service behind it is called and the result returned. All service roles are applied.

Example:

```
serviceId Test.Command.example

```


### Command *include* 

The *include* command is actually rather a macro the includes the statements of another service. This actually implies that roles of the
inluded service are not applied.


Example:

```
include Test.Command.example

```


### Command *java* or *class* 

The parameter part of a *java* or *class* command 
is a java class that implements the *RemoteQuery.IQuery* interface


Example:

```
java org.jground.ProcessTicket

```



### Command *if*, *else*, *end* 

The *if* command expects a parameter and if the parameter has a value the command below are executed. If not the commands below the *else* are executed. The *end*  signifies the end of the *if*.

Example:

```
if tickeTid;
    serviceId Ticket.update;
  else;
    serviceId Ticket.insert;
end
```

### Command *switch*, *case*, *default*, *break*, *end* 

The *switch* command expects a parameter name. If the value of the parameter is the same as the parameter part of a *case* statement, this *case* statement matches. The statements after a matching *case* are processed to the end of the *switch* child statements or to the break statements. The statements after the *default* are processed if there was not matching case statements before. The *end* statement signifies the end of the *switch*.

Example:

```
switch ticketType;
  case comment;    
    serviceId TicketComment.save;
    break;
  case incident;    
    serviceId TicketIncident.save;
    break;
  default;    
    serviceId Ticket.save;
end  
```


### Command *foreach*, *end* 

The *foreach* command expects as an argument a statement. The result of this statement is used for iteration over the rows. The rows are taken for paramter values with the column names (in camel case) as parameter names. The *end* statement signifies the end of the *foreach*.

Example:

```
foreach 
  select NAME, VALUE from JGROUND.T_APP_PROPERTIES 
  ;
  insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:name || '-2', :value)
  ;
end
```




### Command *while*, *end* 

The *while* command is very similar to the *if* command. The child statements of the while are repeatedly executed till the parameter value of the *while* is empty. The *end* statement signifies the end of the *foreach*.

Example:

```
foreach 
  select NAME, VALUE from JGROUND.T_APP_PROPERTIES 
  ;
  insert into JGROUND.T_APP_PROPERTIES (NAME, VALUE)  values (:name || '-2', :value)
  ;
end
```

