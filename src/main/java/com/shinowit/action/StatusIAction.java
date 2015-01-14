package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeProStatusInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/6.
 */
public class StatusIAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeProStatusInfoEntity> dao;

    private TMeProStatusInfoEntity SInfo;

    private List<TMeProStatusInfoEntity> listinfo;

    private int page;

    private int rows;

    private int limit;

    public String Slistinfo(){

        listinfo=dao.queryForPage("from TMeProStatusInfoEntity",getPage(),getLimit());
        rows=dao.listAll(TMeProStatusInfoEntity.class).size();
        return "slist";
    }

    public TMeProStatusInfoEntity getSInfo() {
        return SInfo;
    }

    public void setSInfo(TMeProStatusInfoEntity SInfo) {
        this.SInfo = SInfo;
    }

    public List<TMeProStatusInfoEntity> getListinfo() {
        return listinfo;
    }

    public void setListinfo(List<TMeProStatusInfoEntity> listinfo) {
        this.listinfo = listinfo;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
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
}
