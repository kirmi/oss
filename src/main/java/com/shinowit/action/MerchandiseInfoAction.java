package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;

public class MerchandiseInfoAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> dao;

    private TMeMerchandiseInfoEntity merchinter;

    private boolean success;

    private boolean queryinsert;

    private String mesg;

    public String mecinfo(){
        dao.insert(merchinter);
        if(dao.insert(merchinter)!=null){
            setSuccess(true);
            setQueryinsert(true);
            setMesg("商品添加成功");
            return "ok";
        }else{
            setSuccess(true);
           setQueryinsert(false);
            setMesg("商品信息有误请认真核对后再提交!");
            return "ok";
        }
    }
    public TMeMerchandiseInfoEntity getMerchinter() {
        return merchinter;
    }

    public void setMerchinter(TMeMerchandiseInfoEntity merchinter) {
        this.merchinter = merchinter;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isQueryinsert() {
        return queryinsert;
    }

    public void setQueryinsert(boolean queryinsert) {
        this.queryinsert = queryinsert;
    }

    public String getMesg() {
        return mesg;
    }

    public void setMesg(String mesg) {
        this.mesg = mesg;
    }
}
