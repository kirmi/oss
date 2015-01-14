package com.shinowit.action;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TBaSupplierInfoEntity;

import javax.annotation.Resource;
import java.io.UnsupportedEncodingException;
import java.util.List;

/**
 * Created by Administrator on 2014/11/10.
 */
public class SupplierInfoAction extends ActionSupport {

    @Resource
    private BaseDAO<TBaSupplierInfoEntity> dao;

    private List<TBaSupplierInfoEntity> querlistmsg;

    private int page;

    private int limit;

    private int rows;

    private String selectsuply;

    public String querylist(){

        if(selectsuply!=null){
            try {
                byte[] bb = selectsuply.getBytes("ISO-8859-1");
                selectsuply = new String(bb, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            querlistmsg=dao.queryForPage("from TBaSupplierInfoEntity where supplierName like\'%"+selectsuply+"%\'",page,limit);
            rows=dao.queryRecordCount("select count(*) from TBaSupplierInfoEntity where like\'%"+selectsuply+"%\'");
            return "ok";
        }else{
            querlistmsg=dao.queryForPage("from TBaSupplierInfoEntity ",page,limit);
            rows=dao.listAll(TBaSupplierInfoEntity.class).size();
            return "ok";
       }
    }


    public List<TBaSupplierInfoEntity> getQuerlistmsg() {
        return querlistmsg;
    }

    public void setQuerlistmsg(List<TBaSupplierInfoEntity> querlistmsg) {
        this.querlistmsg = querlistmsg;
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

    public String getSelectsuply() {
        return selectsuply;
    }

    public void setSelectsuply(String selectsuply) {
        this.selectsuply = selectsuply;
    }
}
