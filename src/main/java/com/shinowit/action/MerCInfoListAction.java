package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseCInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/18.
 */
public class MerCInfoListAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseCInfoEntity> dao;

    private List<TMeMerchandiseCInfoEntity> listmerchinfo;

    private int limit;

    private int rows;

    private int page;

    public String listinfo(){

        rows=dao.listAll(TMeMerchandiseCInfoEntity.class).size();

        listmerchinfo=dao.queryForPage("from TMeMerchandiseCInfoEntity" ,getPage(),getLimit());

        return "merlist";
    }


    public List<TMeMerchandiseCInfoEntity> getListmerchinfo() {
        return listmerchinfo;
    }

    public void setListmerchinfo(List<TMeMerchandiseCInfoEntity> listmerchinfo) {
        this.listmerchinfo = listmerchinfo;
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

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }
}
