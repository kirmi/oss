package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaDeliveryInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/10.
 */
public class DeliveryInfoListAction extends ActionSupport{

    @Resource
    private BaseDAO<TBaDeliveryInfoEntity> dao;

    private List<TBaDeliveryInfoEntity> deliver;

    private int page ;

    private int limit;

    private int rows;

    public String deliverlistinfo(){

        deliver=dao.queryForPage("from TBaDeliveryInfoEntity",page,limit);

        rows=dao.listAll(TBaDeliveryInfoEntity.class).size();

        return"deliverlist";
    }

    public List<TBaDeliveryInfoEntity> getDeliver() {
        return deliver;
    }

    public void setDeliver(List<TBaDeliveryInfoEntity> deliver) {
        this.deliver = deliver;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }
}
