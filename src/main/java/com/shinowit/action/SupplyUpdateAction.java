package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/12.
 */
public class SupplyUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;

    private TBaSupplierInfoEntity supplieupdate;

    private boolean success;

    private boolean upinfo;

    private String infoma;

    public String supplyupdete(){

        dao.update(supplieupdate);
        if(supplieupdate.getSupplierName()!=null){
            setSuccess(true);
            setUpinfo(true);
            return"upchange";

        }else {
            setSuccess(true);
            setSuccess(false);
            setUpinfo(true);
            return"upchange";
        }

    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isUpinfo() {
        return upinfo;
    }

    public void setUpinfo(boolean upinfo) {
        this.upinfo = upinfo;
    }

    public String getInfoma() {
        return infoma;
    }

    public void setInfoma(String infoma) {
        this.infoma = infoma;
    }

    public TBaSupplierInfoEntity getSupplieupdate() {
        return supplieupdate;
    }

    public void setSupplieupdate(TBaSupplierInfoEntity supplieupdate) {
        this.supplieupdate = supplieupdate;
    }
}
