package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfoEntity;

import javax.annotation.Resource;

public class StatusDelAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeProStatusInfoEntity> dao;

    private String statusdel;

    private boolean success;

    private boolean query;

    private String message;

    public String statusdelinfo(){
          int nn=dao.executeHQL("delete from TMeProStatusInfoEntity where proStatusName=?",statusdel);
        if(nn>0){
            setSuccess(true);
            setQuery(true);
            setMessage("销售状态删除成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("由于网络或是个人原因提交失败，请回去认真检查是否有误！");
        }
        return"staidel";
    }

    public String getStatusdel() {
        return statusdel;
    }

    public void setStatusdel(String statusdel) {
        this.statusdel = statusdel;
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
