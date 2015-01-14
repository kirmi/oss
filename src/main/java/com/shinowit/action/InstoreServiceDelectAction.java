package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.InstoreDelectService;

import javax.annotation.Resource;

public class InstoreServiceDelectAction extends ActionSupport {

    @Resource
    private InstoreDelectService instoreDelectService;

    private boolean success;

    private boolean delinsotrequer;

    private String delinstoremess;

    private String  ttt;

    public String delinstore(){
        boolean delins=instoreDelectService.instoredelect(ttt);
        if(delins==true){
            setSuccess(true);
            setDelinsotrequer(true);
            return"delinst";
        }else{
            setSuccess(true);
            setDelinsotrequer(false);
            return"delinst";
        }
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isDelinsotrequer() {
        return delinsotrequer;
    }

    public void setDelinsotrequer(boolean delinsotrequer) {
        this.delinsotrequer = delinsotrequer;
    }

    public String getDelinstoremess() {
        return delinstoremess;
    }

    public void setDelinstoremess(String delinstoremess) {
        this.delinstoremess = delinstoremess;
    }


    public String getTtt() {
        return ttt;
    }

    public void setTtt(String ttt) {
        this.ttt = ttt;
    }
}
