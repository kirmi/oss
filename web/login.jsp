<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2014/12/6
  Time: 12:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
  <script type="text/javascript" src="extjs/ext-all.js"></script>
  <link href="extjs/resources/ext-theme-gray/ext-theme-gray-all-debug.css" rel="stylesheet" type="text/css"/>
  <script src="js/login.js"></script>
  <script type="text/javascript">
    Ext.onReady(function(){
      Ext.create("Login",{
        renderTo:main
      }).center();
    });
  </script>
  <title></title>
  <style type="text/css">
    #main{
      margin-top:205px;
      float:right;
      margin-right:355px;
      width:307px;
      height:314px;
    }
  </style>
</head>
<body style="background:url('images/login.jpg');">
<div id="main"></div>
</body>
</html>
