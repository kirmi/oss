package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/2.
 */
public class OutStockInfoDelAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao;

    private boolean success;

    private boolean query;

    private String message;

    private String ssdd;

    public String outstockdel(){

        int outdedel=dao.executeHQL("delete from TMeOutStockInfoEntity where outBillCode=?",ssdd);
        if(outdedel>0){
            setSuccess(true);
            setQuery(true);
            setMessage("信息删除成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息删除失败");
        }
        return"outsdel";
    }

    public String getSsdd() {
        return ssdd;
    }

    public void setSsdd(String ssdd) {
        this.ssdd = ssdd;
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
