package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.service.OutStockDelService;

import javax.annotation.Resource;


public class OutStockDelServiceAction extends ActionSupport {

    @Resource
    private OutStockDelService outStockDelService;

    private String listinfomation;

    private boolean success;

    private boolean queary;

    private String message;

    public String outstockdel(){

        boolean tit=outStockDelService.uotstockdel(listinfomation);

        if(tit==true){
            setSuccess(true);
            setQueary(true);
            setMessage("信息删除成功");
        }else{
            setSuccess(false);
            setQueary(true);
            setMessage("信息删除失败请重新删除");
        }
        return"outstock";
    }

    public String getListinfomation() {
        return listinfomation;
    }

    public void setListinfomation(String listinfomation) {
        this.listinfomation = listinfomation;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isQueary() {
        return queary;
    }

    public void setQueary(boolean queary) {
        this.queary = queary;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
