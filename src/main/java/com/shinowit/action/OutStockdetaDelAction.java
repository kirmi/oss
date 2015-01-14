package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/2.
 */
public class OutStockdetaDelAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> dao;

    private boolean success;

    private boolean query;

    private String message;

    private String outdetadel;

    public String outdetadel(){

        int outdedel=dao.executeHQL("delete from TMeOutStockDetailsInfoEntity where outBillCode=?",outdetadel);
        if(outdedel>0){
            setSuccess(true);
            setQuery(true);
            setMessage("信息删除成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息删失败");
        }
        return "dtael";
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

    public String getOutdetadel() {
        return outdetadel;
    }

    public void setOutdetadel(String outdetadel) {
        this.outdetadel = outdetadel;
    }
}
