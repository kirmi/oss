package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/8.
 */
public class RoelInsAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;

    private TAuRoleInfoEntity insrole;

    private boolean success;

    private boolean query;

    private String message;

    public String roleinsert(){
        dao.insert(insrole);
        if(dao.insert(insrole)!=null){
            setSuccess(true);
            setQuery(true);
            setMessage("信息插入成功");
        }else{
            setSuccess(true);
            setQuery(true);
            setMessage("信息插入失败");
        }
        return"inserre";
    }

    public TAuRoleInfoEntity getInsrole() {
        return insrole;
    }

    public void setInsrole(TAuRoleInfoEntity insrole) {
        this.insrole = insrole;
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
