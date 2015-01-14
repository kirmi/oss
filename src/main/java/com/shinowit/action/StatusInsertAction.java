package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfoEntity;
import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/28.
 */
public class StatusInsertAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeProStatusInfoEntity> dao;

    private TMeProStatusInfoEntity sta;

    private boolean success;

    private boolean query;

    private String message;

    public String statusinsert(){
          dao.insert(sta);
        if(dao.insert(sta)!=null){
            setSuccess(true);
            setQuery(true);
            setMessage("销售状态插入成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("由于网络或是个人原因提交失败，请回去认真检查是否有误！");
        }
        return"stai";
    }

    public TMeProStatusInfoEntity getSta() {
        return sta;
    }

    public void setSta(TMeProStatusInfoEntity sta) {
        this.sta = sta;
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
