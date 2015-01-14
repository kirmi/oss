package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfoEntity;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/10.
 */
public class DeliveryInfoInsertAction extends ActionSupport{

    @Resource
    private BaseDAO<TBaDeliveryInfoEntity> dao;

    private TBaDeliveryInfoEntity deliver;

    private boolean success;

    private boolean query;

    private String message;

    public String deliverinsinfo(){

        dao.insert(deliver);
        if(dao.insert(deliver)!=null){
            setSuccess(true);
            setQuery(true);
            setMessage("物流配送商信息添加成功");
        }else{
            setSuccess(false);
            setQuery(true);
            setMessage("物流配送商信息添加失败");
        }
        return"deliveri";
    }

    public TBaDeliveryInfoEntity getDeliver() {
        return deliver;
    }

    public void setDeliver(TBaDeliveryInfoEntity deliver) {
        this.deliver = deliver;
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
