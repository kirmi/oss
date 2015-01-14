package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockInfoEntity;

import javax.annotation.Resource;

public class InStockDelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> dao;

    private String ccc;

    private boolean success;

    private boolean query;

    private String message;

    public String dellit(){
        int de=dao.executeHQL("delete from TMeInStockInfoEntity where billCode=?",ccc);
        if( de>0){
            setSuccess(true);
            setQuery(true);
            setMessage("信息删除成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息删除失败");
        }
        return "ccli";
    }

    public String getCcc() {
        return ccc;
    }

    public void setCcc(String ccc) {
        this.ccc = ccc;
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
