package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;
import com.shinowit.entity.TMeInStockInfoEntity;
import com.shinowit.service.InStoreUpdateService;
import javax.annotation.Resource;

public class InStockUpdateSAction extends ActionSupport {

    @Resource
    private InStoreUpdateService inStockUpdateService;

    private boolean success;

    private boolean query;

    private String message;

    private TMeInStockInfoEntity insdd;

    private TMeInStockDetailsInfoEntity insttf;

    public String instockup(){

        boolean inslis=inStockUpdateService.instoreupdate(insdd,insttf);

        if(inslis==true){
            setSuccess(true);
            setQuery(true);
            setMessage("信息修改成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息修改失败");
        }
        return"inslist";
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

    public TMeInStockInfoEntity getInsdd() {
        return insdd;
    }

    public void setInsdd(TMeInStockInfoEntity insdd) {
        this.insdd = insdd;
    }

    public TMeInStockDetailsInfoEntity getInsttf() {
        return insttf;
    }

    public void setInsttf(TMeInStockDetailsInfoEntity insttf) {
        this.insttf = insttf;
    }
}
