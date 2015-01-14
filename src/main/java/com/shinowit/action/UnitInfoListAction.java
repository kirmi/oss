package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeUnitInfoEntity;

import javax.annotation.Resource;
import java.util.List;

public class UnitInfoListAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeUnitInfoEntity> dao;

    private List<TMeUnitInfoEntity> listUnitInfo;

    private int page;

    private int rows;

    private int limit;

    public String UnitInfo() {

        rows = dao.listAll(TMeUnitInfoEntity.class).size();
        listUnitInfo=dao.queryForPage("from TMeUnitInfoEntity",getPage(),getLimit());
        return "list";
    }


    public List<TMeUnitInfoEntity> getListUnitInfo() {
        return listUnitInfo;
    }

    public void setListUnitInfo(List<TMeUnitInfoEntity> listUnitInfo) {
        this.listUnitInfo = listUnitInfo;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
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
}