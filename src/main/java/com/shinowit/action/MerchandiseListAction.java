package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeMerchandiseInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/10.
 */
public class MerchandiseListAction extends ActionSupport {

    @Resource
    private BaseDAO<TMeMerchandiseInfoEntity> dao;

    private List<TMeMerchandiseInfoEntity> querlistmech;

    private int page;//显示当前页

    private int limit;//第一页显示多条记录

    private int rows;//总数

    public String merchanquerylist(){

            querlistmech=dao.queryForPage("from TMeMerchandiseInfoEntity order by ID desc",getPage(), getLimit());
        rows=dao.listAll(TMeMerchandiseInfoEntity.class).size();
        return "success";
    }

    public List<TMeMerchandiseInfoEntity> getQuerlistmech() {
        return querlistmech;
    }

    public void setQuerlistmech(List<TMeMerchandiseInfoEntity> querlistmech) {
        this.querlistmech = querlistmech;
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
