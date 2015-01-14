package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;

import javax.annotation.Resource;


public class MerCInfoDelectAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> dao;

    private TMeMerchandiseCInfoEntity tmecladel;

    private boolean success;

    private boolean tmecladelquery;

    private String tmecladelmess;

    public String temcladelect(){
        dao.delete(tmecladel);
        if(tmecladel.getMerchandiseCid()!=null){
            setSuccess(true);
           setTmecladelquery(true);
            setTmecladelmess("商品类别删除成功");
            return "teclsdsel";
        }else{
            setSuccess(true);
            setTmecladelquery(false);
            setTmecladelmess("商品类别删除失败");
            return "teclsdsesl";
        }
    }

    public TMeMerchandiseCInfoEntity getTmecladel() {
        return tmecladel;
    }

    public void setTmecladel(TMeMerchandiseCInfoEntity tmecladel) {
        this.tmecladel = tmecladel;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isTmecladelquery() {
        return tmecladelquery;
    }

    public void setTmecladelquery(boolean tmecladelquery) {
        this.tmecladelquery = tmecladelquery;
    }

    public String getTmecladelmess() {
        return tmecladelmess;
    }

    public void setTmecladelmess(String tmecladelmess) {
        this.tmecladelmess = tmecladelmess;
    }
}
