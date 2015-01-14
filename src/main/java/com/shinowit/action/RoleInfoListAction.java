package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TAuRoleInfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/8.
 */
public class RoleInfoListAction extends ActionSupport {

    @Resource
    private BaseDAO<TAuRoleInfoEntity> dao;

    private List<TAuRoleInfoEntity> listrole;

    private int page;

    private int limit;

    private int rows;

    public String roleinfomation(){

        listrole=dao.queryForPage("from TAuRoleInfoEntity",page,limit);

        rows=dao.listAll(TAuRoleInfoEntity.class).size();

        return"rol";
    }

    public List<TAuRoleInfoEntity> getListrole() {
        return listrole;
    }

    public void setListrole(List<TAuRoleInfoEntity> listrole) {
        this.listrole = listrole;
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
