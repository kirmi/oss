package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;


import javax.annotation.Resource;

public class InStockDetalistDelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;

    private String ddd;

    private boolean success;

    private boolean query;

    private String message;

    public String deldetalit(){
        int de=dao.executeHQL("delete from TMeInStockDetailsInfoEntity where billCode=?",ddd);
        if( de>0){
            setSuccess(true);
            setQuery(true);
            setMessage("入库明细信息删除成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("入库明细信息删除失败");
        }
        return "deta";

    }

    public String getDdd() {
        return ddd;
    }

    public void setDdd(String ddd) {
        this.ddd = ddd;
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
