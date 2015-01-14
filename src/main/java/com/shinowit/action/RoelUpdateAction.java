package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/8.
 */
public class RoelUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;

    private TAuRoleInfoEntity updrole;

    private boolean success;

    private boolean query;

    private String message;

    public String roleupdinfoa(){
        dao.update(updrole);
        if(dao.update(updrole)==true){
            setSuccess(true);
            setQuery(true);
            setMessage("信息修改成功");
        }else{
            setSuccess(true);
            setQuery(true);
            setMessage("信息修改失败");
        }
        return"updarelo";
    }

    public TAuRoleInfoEntity getUpdrole() {
        return updrole;
    }

    public void setUpdrole(TAuRoleInfoEntity updrole) {
        this.updrole = updrole;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isQuery() {
        return query;
    }

    public void setQuery(boolean query) {
        this.query = query;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
