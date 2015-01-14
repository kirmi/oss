package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/16.
 */
public class InStockInfoAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeInStockInfoEntity> dao;

    private List<TMeInStockInfoEntity> listall;

    private int limit;

    private  int row;

    private  int page ;

    public String liststock(){

        listall=dao.queryForPage("from TMeInStockInfoEntity",getPage(),getLimit());
        row=dao.listAll(TMeInStockInfoEntity.class).size();
        return"sto";
    }

    public List<TMeInStockInfoEntity> getListall() {
        return listall;
    }

    public void setListall(List<TMeInStockInfoEntity> listall) {
        this.listall = listall;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
