<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/12/6
  Time: 12:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<html>
<head>
    <title></title>
  <link href="extjs/resources/ext-theme-access/ext-theme-access-all.css"/>
  <link rel="stylesheet" href="extjs/resources/ext-theme-neptune/ext-theme-neptune-all.css" type="text/css"/>
  <script src="extjs/ext-all.js"></script>
  <script src="js/Index.js" type="text/javascript"></script>
  <script type="text/javascript" src="extjs/ext-lang-zh_CN.js"></script>
  <script type="text/javascript">
    Ext.onReady(function(){
      Ext.create("js.Index",{
        renderTo: Ext.getBody()
      }).center();
    });
  </script>
  <s:property value="#session.sessionid"/>
  <%
    HttpSession Session = request.getSession();
    String currentsession = (String)Session.getAttribute("roleId");
    if(currentsession==null){
      response.sendRedirect("/login.jsp");
    }
  %>
</head>
<body>
<s:hidden id="aa" value="%{#session.src.operName}"></s:hidden>
<s:hidden id="bb" value="%{#session.src.TAuRoleInfoByRoleId.roleName}"></s:hidden>
</body>
</html>
