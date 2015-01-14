package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;

import javax.annotation.Resource;


public class MerCInfoInsetAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> dao;

    private TMeMerchandiseCInfoEntity tmecla;

    private boolean success;

    private boolean tmeclaquery;

    private String tmeclamess;

    public String temclainsrt(){
        dao.insert(tmecla);
        if(dao.insert(tmecla)!=null){
            setSuccess(true);
            setTmeclaquery(true);
            setTmeclamess("商品类别添加成功");
            return "tecls";
        }else{
            setSuccess(true);
            setTmeclaquery(false);
            setTmeclamess("商品类别添加成功");
            return "tecls";
        }
    }
    public TMeMerchandiseCInfoEntity getTmecla() {
        return tmecla;
    }

    public void setTmecla(TMeMerchandiseCInfoEntity tmecla) {
        this.tmecla = tmecla;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isTmeclaquery() {
        return tmeclaquery;
    }

    public void setTmeclaquery(boolean tmeclaquery) {
        this.tmeclaquery = tmeclaquery;
    }

    public String getTmeclamess() {
        return tmeclamess;
    }

    public void setTmeclamess(String tmeclamess) {
        this.tmeclamess = tmeclamess;
    }
}
