package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/10.
 */
public class UnitifoInsertAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeUnitInfoEntity> dao;

    private TMeUnitInfoEntity inunit;

    private boolean success;

    private boolean query;

    private String message;

    public String inubitinfo(){

        dao.insert(inunit);
        if(dao.insert(inunit)!=null){
            setSuccess(true);
            setQuery(true);
            setMessage("信息插入成功");
        }else{
            setSuccess(true);
            setQuery(false);
            setMessage("信息插入失败");
        }
        return"ins";
    }

    public TMeUnitInfoEntity getInunit() {
        return inunit;
    }

    public void setInunit(TMeUnitInfoEntity inunit) {
        this.inunit = inunit;
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
