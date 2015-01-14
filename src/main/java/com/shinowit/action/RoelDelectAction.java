package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/8.
 */
public class RoelDelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;

    private TAuRoleInfoEntity insrole;

    private boolean success;

    private String reolist;

    private String message;

    public String roledel(){
        String []sarry = reolist.split(",");
        for(String reolde:sarry){
            int i = dao.executeHQL("delete from TAuRoleInfoEntity where roleId=?",reolde);
            if(i<1){
                setSuccess(false);
                setMessage("删除失败,请重新删除");
            }
            if(i==1){
                setSuccess(true);
                setMessage("删除成功,请重新查看");
            }
        }
        return"delere";
    }

    public TAuRoleInfoEntity getInsrole() {
        return insrole;
    }

    public void setInsrole(TAuRoleInfoEntity insrole) {
        this.insrole = insrole;
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
