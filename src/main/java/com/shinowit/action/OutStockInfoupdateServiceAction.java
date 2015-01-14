package com.shinowit.action;


import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;
import com.shinowit.entity.TMeOutStockInfoEntity;
import com.shinowit.service.OutStockInfoupdateService;

import javax.annotation.Resource;

public class OutStockInfoupdateServiceAction extends ActionSupport {

    @Resource
    private OutStockInfoupdateService outStockInfoupdateService;

    private boolean success;

    private boolean query;

    private String message;

    private TMeOutStockInfoEntity sinfo;

    private TMeOutStockDetailsInfoEntity sdelinfo;

    public String outstocklist(){
        boolean dnf=outStockInfoupdateService.outstock(sinfo,sdelinfo);
        if(dnf==true){
            setSuccess(true);
            setQuery(true);
            setMessage("信息修改成功");
        }else{

            setSuccess(false);
            setQuery(true);
            setMessage("信息修改失败");
        }
        return"okups";
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

    public TMeOutStockInfoEntity getSinfo() {
        return sinfo;
    }

    public void setSinfo(TMeOutStockInfoEntity sinfo) {
        this.sinfo = sinfo;
    }

    public TMeOutStockDetailsInfoEntity getSdelinfo() {
        return sdelinfo;
    }

    public void setSdelinfo(TMeOutStockDetailsInfoEntity sdelinfo) {
        this.sdelinfo = sdelinfo;
    }
}
