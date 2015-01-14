package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/12.
 */
public class SupplyDeldateAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;

    private TBaSupplierInfoEntity delsup;

    private boolean success;

    private boolean dequery;

    private String mesage;

    public String delsupply(){
        dao.delete(delsup);
        String ss=delsup.getSupplierName();
        if(ss!=null){
            setSuccess(true);
            setDequery(true);

        }else {
            setSuccess(true);
            setDequery(false);
        }
        return "del";
    }

    public TBaSupplierInfoEntity getDelsup() {
        return delsup;
    }

    public void setDelsup(TBaSupplierInfoEntity delsup) {
        this.delsup = delsup;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }


    public boolean isDequery() {
        return dequery;
    }

    public void setDequery(boolean dequery) {
        this.dequery = dequery;
    }

    public String getMesage() {
        return mesage;
    }

    public void setMesage(String mesage) {
        this.mesage = mesage;
    }
}
