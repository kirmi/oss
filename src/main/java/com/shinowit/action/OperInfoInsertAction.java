package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/2.
 */
public class OperInfoInsertAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private TAuOperInfoEntity operin;

    private boolean success;

    private boolean query;

    private String message;

    public String operinfoinsert(){
        dao.insert(operin);
        if(dao.insert(operin)!=null){
            setSuccess(true);
            setQuery(true);
            setMessage("操作员插入成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("因为某些原因操作员插入失败");
        }
        return"inope";
    }

    public TAuOperInfoEntity getOperin() {
        return operin;
    }

    public void setOperin(TAuOperInfoEntity operin) {
        this.operin = operin;
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
