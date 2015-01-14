package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfoEntity;

import javax.annotation.Resource;
import java.util.List;
public class InStockDetailsInfoAction extends ActionSupport {
    @Resource
    private BaseDAO<TMeInStockDetailsInfoEntity> dao;

    private List<TMeInStockDetailsInfoEntity> Instockdetailist;

    private int page;

    private int limit;

    private int rows;

    private String selectbillcode;

    public String instodellist(){
       if((selectbillcode!=null)){
           Instockdetailist=dao.queryForPage("from TMeInStockDetailsInfoEntity where billCode=?",page,limit,selectbillcode);
           rows=dao.queryRecordCount("from TMeInStockDetailsInfoEntity where billCode=?",selectbillcode);
           return "show";
       }else{
//           Instockdetailist=dao.queryForPage("from TMeInStockDetailsInfoEntity",page,limit);
//           rows=dao.listAll(TMeInStockDetailsInfoEntity.class).size();
           return "show";
       }
    }

    public List<TMeInStockDetailsInfoEntity> getInstockdetailist() {
        return Instockdetailist;
    }

    public void setInstockdetailist(List<TMeInStockDetailsInfoEntity> instockdetailist) {
        Instockdetailist = instockdetailist;
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

    public String getSelectbillcode() {
        return selectbillcode;
    }

    public void setSelectbillcode(String selectbillcode) {
        this.selectbillcode = selectbillcode;
    }
}
