package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockInfoEntity;

import javax.annotation.Resource;
import java.util.List;


public class OutStockInfolistAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeOutStockInfoEntity> dao;

    private List<TMeOutStockInfoEntity> listoutstock;

    private int rows;

    private int limit;

    private int page;

    public String outlist(){
        listoutstock= dao.queryForPage("from TMeOutStockInfoEntity ",page,limit);
        rows=dao.listAll(TMeOutStockInfoEntity.class).size();
        return"outinfoist";
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public List<TMeOutStockInfoEntity> getListoutstock() {
        return listoutstock;
    }

    public void setListoutstock(List<TMeOutStockInfoEntity> listoutstock) {
        this.listoutstock = listoutstock;
    }
}
