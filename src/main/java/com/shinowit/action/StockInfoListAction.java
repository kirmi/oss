package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeStockInfoEntity;

import javax.annotation.Resource;
import java.util.List;

public class StockInfoListAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeStockInfoEntity> dao;

    private List<TMeStockInfoEntity> ListStockInfo;

    private  int rows;

    private int Page;

    private int limit;

    public String StockInfo(){

        ListStockInfo=dao.queryForPage("from TMeStockInfoEntity",getPage(),getLimit());

        rows=dao.listAll(TMeStockInfoEntity.class).size();

        return"stocklist";
    }

    public List<TMeStockInfoEntity> getListStockInfo() {
        return ListStockInfo;
    }

    public void setListStockInfo(List<TMeStockInfoEntity> listStockInfo) {
        ListStockInfo = listStockInfo;
    }


    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getPage() {
        return Page;
    }

    public void setPage(int page) {
        Page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }
}
