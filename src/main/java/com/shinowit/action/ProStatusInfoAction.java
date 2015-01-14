package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/17.
 */
public class ProStatusInfoAction extends ActionSupport {

    @Resource

    private BaseDAO<TMeProStatusInfoEntity> dao;

    private TMeProStatusInfoEntity sta;

    private boolean succcess;

    private boolean staquery;

    private String stamessage;

    public String stainsert(){
        dao.insert(sta);
        if (dao.insert(sta)!=null){
            setSucccess(true);
            setStaquery(true);
            setStamessage("促销状态添加成功");
            return"stain";
        }else{
            setSucccess(true);
            setStaquery(false);
            setStamessage("促销状态添加成功");
            return "stain";
        }
    }

    public TMeProStatusInfoEntity getSta() {
        return sta;
    }

    public void setSta(TMeProStatusInfoEntity sta) {
        this.sta = sta;
    }

    public boolean isSucccess() {
        return succcess;
    }

    public void setSucccess(boolean succcess) {
        this.succcess = succcess;
    }

    public boolean isStaquery() {
        return staquery;
    }

    public void setStaquery(boolean staquery) {
        this.staquery = staquery;
    }

    public String getStamessage() {
        return stamessage;
    }

    public void setStamessage(String stamessage) {
        this.stamessage = stamessage;
    }
}
