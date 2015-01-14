package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfoEntity;

import javax.annotation.Resource;
import java.util.List;


public class OutStockDetailsInfolist extends ActionSupport {
    @Resource
    private BaseDAO<TMeOutStockDetailsInfoEntity> dao;

    private String selectoutdetalbillcode;

    private List<TMeOutStockDetailsInfoEntity> listuotdetal;

    private int rows;

    private int limit;

    private int page;

    public String listoktdetal(){
        listuotdetal=dao.queryForPage("from TMeOutStockDetailsInfoEntity where outBillCode=?",page,limit,selectoutdetalbillcode);

        rows=dao.queryRecordCount("from TMeOutStockDetailsInfoEntity where outBillCode=?",selectoutdetalbillcode);
        return "list";
    }
    public List<TMeOutStockDetailsInfoEntity> getListuotdetal() {
        return listuotdetal;
    }

    public void setListuotdetal(List<TMeOutStockDetailsInfoEntity> listuotdetal) {
        this.listuotdetal = listuotdetal;
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

    public String getSelectoutdetalbillcode() {
        return selectoutdetalbillcode;
    }

    public void setSelectoutdetalbillcode(String selectoutdetalbillcode) {
        this.selectoutdetalbillcode = selectoutdetalbillcode;
    }
}
