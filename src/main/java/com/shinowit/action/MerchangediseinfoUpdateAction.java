package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;


public class MerchangediseinfoUpdateAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity>  dao;

    private TMeMerchandiseInfoEntity upstatuinfo;

    private boolean success;

    private boolean query;

    private String message;

    public String statuddel(){
        dao.update(upstatuinfo);
        if( dao.update(upstatuinfo)==true){
            setSuccess(true);
            setQuery(true);
            setMessage("信息修改成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息修改成功");
        }
        return"stsdel";
    }

    public TMeMerchandiseInfoEntity getUpstatuinfo() {
        return upstatuinfo;
    }

    public void setUpstatuinfo(TMeMerchandiseInfoEntity upstatuinfo) {
        this.upstatuinfo = upstatuinfo;
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
}
