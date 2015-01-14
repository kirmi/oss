package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/6.
 */
public class SupplierAction extends ActionSupport{

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;

    private TBaSupplierInfoEntity supler;

    private boolean success;

    private boolean query;

    private String mesg;

    public String suplire(){
        dao.insert(supler);
        if(dao.insert(supler)!=null){
            setSuccess(true);
            setQuery(true);
            return "ok";
        }else{
            setSuccess(true);
            setQuery(false);
            return "ok";
        }
    }

    public TBaSupplierInfoEntity getSupler() {
        return supler;
    }

    public void setSupler(TBaSupplierInfoEntity supler) {
        this.supler = supler;
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

    public String getMesg() {
        return mesg;
    }

    public void setMesg(String mesg) {
        this.mesg = mesg;
    }
}
