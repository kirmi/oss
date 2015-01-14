package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/8.
 */
public class OperainfoUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private TAuOperInfoEntity updaopera;

    private boolean success;

    private boolean query;

    private String message;

    public String upoperdel(){
        dao.update(updaopera);
        if(dao.update(updaopera)==true){
            setSuccess(true);
            setQuery(true);
            setMessage("操作员信息修改成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("操作员信息修改成功");
        }
        return"upoper";
    }

    public TAuOperInfoEntity getUpdaopera() {
        return updaopera;
    }

    public void setUpdaopera(TAuOperInfoEntity updaopera) {
        this.updaopera = updaopera;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isQuery() {
        return query;
    }

    public void setQuery(boolean query) {
        this.query = query;
    }
}
