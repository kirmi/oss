package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;

import javax.annotation.Resource;


public class MerCInfoUpdatetAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> dao;

    private TMeMerchandiseCInfoEntity tmeclaupdate;

    private boolean success;

    private boolean tmeclaupdatequery;

    private String tmeclaupdatelmess;

    public String temclaupdate(){
        dao.update(tmeclaupdate);
        if(tmeclaupdate.getMerchandiseCName()!=null){
            setSuccess(true);
            setTmeclaupdatequery(true);
            setTmeclaupdatelmess("商品类别修改成功");
            return "teclsudate";
        }else{
            setSuccess(true);
            setTmeclaupdatequery(false);
            setTmeclaupdatelmess("商品类别修改失败");
            return "teclsudate";
        }
    }

    public TMeMerchandiseCInfoEntity getTmeclaupdate() {
        return tmeclaupdate;
    }

    public void setTmeclaupdate(TMeMerchandiseCInfoEntity tmeclaupdate) {
        this.tmeclaupdate = tmeclaupdate;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isTmeclaupdatequery() {
        return tmeclaupdatequery;
    }

    public void setTmeclaupdatequery(boolean tmeclaupdatequery) {
        this.tmeclaupdatequery = tmeclaupdatequery;
    }

    public String getTmeclaupdatelmess() {
        return tmeclaupdatelmess;
    }

    public void setTmeclaupdatelmess(String tmeclaupdatelmess) {
        this.tmeclaupdatelmess = tmeclaupdatelmess;
    }
}
