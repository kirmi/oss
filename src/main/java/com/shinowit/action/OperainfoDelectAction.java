package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;


import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/8.
 */
public class OperainfoDelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private TAuOperInfoEntity updaopera;

    private boolean success;

    private String reolist;

    private String message;

    public String operdel(){
        String []sarry = reolist.split(",");
        for(String oper:sarry){
            int i = dao.executeHQL("delete from TAuOperInfoEntity where operId=?",oper);
            if(i<1){
                setSuccess(false);
                setMessage("删除失败,请重新删除");
            }
            if(i==1){
                setSuccess(true);
                setMessage("删除成功,请重新查看");
            }
        }
        return"deloper";
    }

    public TAuOperInfoEntity getUpdaopera() {
        return updaopera;
    }

    public void setUpdaopera(TAuOperInfoEntity updaopera) {
        this.updaopera = updaopera;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getReolist() {
        return reolist;
    }

    public void setReolist(String reolist) {
        this.reolist = reolist;
    }
}
