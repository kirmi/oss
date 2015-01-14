package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;

public class MerchanDelAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> dao;

    private TMeMerchandiseInfoEntity merchdel;

    private boolean success;

    private boolean querydel;

    private String messdel;

    public String merchdelect(){
        dao.delete(merchdel);
        if(merchdel.getMerchandiseId()!=null){
            setSuccess(true);
            setQuerydel(true);
            setMessdel("商品删除成功");
            return"merch";
        }else{
            setSuccess(true);
            setQuerydel(false);
            setMessdel("商品删除失败");
            return"merch";
        }

    }

    public TMeMerchandiseInfoEntity getMerchdel() {
        return merchdel;
    }

    public void setMerchdel(TMeMerchandiseInfoEntity merchdel) {
        this.merchdel = merchdel;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isQuerydel() {
        return querydel;
    }

    public void setQuerydel(boolean querydel) {
        this.querydel = querydel;
    }

    public String getMessdel() {
        return messdel;
    }

    public void setMessdel(String messdel) {
        this.messdel = messdel;
    }
}
