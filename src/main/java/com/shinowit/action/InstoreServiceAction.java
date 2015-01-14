package com.shinowit.action;
import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.service.InstoreService;

import javax.annotation.Resource;
import java.util.List;


public class InstoreServiceAction extends ActionSupport {

    @Resource
    private InstoreService instoreService;

    private boolean success;

    private boolean instockquery;

    private String instockmess;

    private List<TMeInStockDetailsInfoEntity> jinhuoData;

    private TMeInStockInfoEntity insok;

    public String instoreinfomation(){
        boolean ss=instoreService.instockinfo(insok ,jinhuoData);
        if(ss==true){
            setSuccess(true);
            setInstockquery(true);
        }else{
            if(ss==false){
                setSuccess(true);
                setInstockquery(true);
            }
        }
        return"ok";
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getInstockmess() {
        return instockmess;
    }

    public void setInstockmess(String instockmess) {
        this.instockmess = instockmess;
    }

    public boolean isInstockquery() {
        return instockquery;
    }

    public void setInstockquery(boolean instockquery) {
        this.instockquery = instockquery;
    }

    public List<TMeInStockDetailsInfoEntity> getJinhuoData() {
        return jinhuoData;
    }

    public void setJinhuoData(List<TMeInStockDetailsInfoEntity> jinhuoData) {
        this.jinhuoData = jinhuoData;
    }

    public TMeInStockInfoEntity getInsok() {
        return insok;
    }

    public void setInsok(TMeInStockInfoEntity insok) {
        this.insok = insok;
    }
}
