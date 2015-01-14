package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuOperInfoEntity;

import javax.annotation.Resource;
import java.util.List;

public class OperInfoListAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuOperInfoEntity> dao;

    private List<TAuOperInfoEntity> operlist;

    private int page;

    private int limit;

    private int rows;

    public String operinfolist(){
        operlist=dao.queryForPage("from TAuOperInfoEntity",page,limit);
        rows=dao.listAll(TAuOperInfoEntity.class).size();
        return"operalist";
    }
    public List<TAuOperInfoEntity> getOperlist() {
        return operlist;
    }

    public void setOperlist(List<TAuOperInfoEntity> operlist) {
        this.operlist = operlist;
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
