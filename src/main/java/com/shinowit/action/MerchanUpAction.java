package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/16.
 */
public class MerchanUpAction extends ActionSupport {
@Resource
    private BaseDAO<TMeMerchandiseInfoEntity> dao;

    private TMeMerchandiseInfoEntity ss;

    private boolean success;

    private boolean query;

    private String mess;

    public String upss(){
        dao.update(ss);
        if(ss.getMerchandiseId()!=null){
            setSuccess(true);
            setQuery(true);
            setMess("商品信息修改成功");
            return"ups";
        }else{
            setSuccess(true);
            setQuery(false);
            setMess("商品信息删除成功");
            return"ups";
        }

    }

    public TMeMerchandiseInfoEntity getSs() {
        return ss;
    }

    public void setSs(TMeMerchandiseInfoEntity ss) {
        this.ss = ss;
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

    public String getMess() {
        return mess;
    }

    public void setMess(String mess) {
        this.mess = mess;
    }
}
