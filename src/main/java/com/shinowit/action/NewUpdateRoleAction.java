package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.UPdateROleDao;
import com.shinowit.entity.TAuMenuInfoEntity;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/12.
 */
public class NewUpdateRoleAction extends ActionSupport {

    @Resource
    private UPdateROleDao dao;

    private TAuRoleInfoEntity uprlosinfo;

    private boolean success;

    private boolean query;

    private String message;

    private List<TAuMenuInfoEntity> updds;

    public String updaatelistmue(){
        dao.updaterole(uprlosinfo,updds);
        if(dao.updaterole(uprlosinfo,updds)==true){
            setSuccess(true);
            setQuery(true);
            setMessage("信息修改成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("信息修改失败");
        }
        return"ok";
    }

    public List<TAuMenuInfoEntity> getUpdds() {
        return updds;
    }

    public void setUpdds(List<TAuMenuInfoEntity> updds) {
        this.updds = updds;
    }

    public TAuRoleInfoEntity getUprlosinfo() {
        return uprlosinfo;
    }

    public void setUprlosinfo(TAuRoleInfoEntity uprlosinfo) {
        this.uprlosinfo = uprlosinfo;
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
